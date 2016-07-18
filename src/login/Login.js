import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Box from 'react-layout-components';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import SvgIcon from 'material-ui/SvgIcon';

import svgIcon from '../../static/oo_o.svg';

import PetroTheme from '../theme/PetroTheme.js';
import styles from './Login.css.js';
import $ from 'jquery';
import localStorage from 'localStorage';

class Login extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading : false
        }
    }

    authMe(){
        let self = this;
        $.post('http://petroadvisor-archeo.rhcloud.com/login', {username : this.refs.usernameField.getValue(), password : this.refs.passwordField.getValue()}, function(data){
            var parsed = JSON.parse(data);
            console.log(parsed);
            if( parsed.result == 1 ){
                localStorage.setItem('petrologin', 1);
                window.location.reload();
                this.props.history.push('/');
            }else{

            }
        }.bind(self));
    }

    showItemToLog(){
        if(!this.state.loading){
            return <RaisedButton label="Login" primary={true} onTouchTap={this.authMe.bind(this)}
                                 style={{backgroundColor:'#EDA65C', width:'auto', minWidth:'100px', marginTop:'20px', marginBottom:'20px'}}/>;
        }else{
            return <CircularProgress size={0.3}/>;
        }
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={PetroTheme}>
                <Box style={styles.bg} justifyContent="center">
                    <Box justifyContent="center" alignItems="center">
                        <Paper zDepth={1} >
                            <Box column justifyContent="center" alignItems="center">
                                <img src={svgIcon} style={{width:'80px', marginTop:'25px'}}/>
                                <TextField
                                    hintText=""
                                    floatingLabelText="Username"
                                    id="username"
                                    style = {styles.username}
                                    underlineStyle={styles.underlineStyle}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    ref = "usernameField"
                                />
                                <TextField
                                    hintText=""
                                    floatingLabelText="Password"
                                    type="password"
                                    id="password"
                                    style = {styles.password}
                                    underlineStyle={styles.underlineStyle}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    ref = "passwordField"
                                />
                                <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"70%"}}>
                                    <center><Checkbox
                                        label="Ricordami"
                                        labelStyle = {{marginLeft : "-50px"}}
                                        style={{width:'100%'}}
                                    />
                                    </center>
                                </div>
                                {this.showItemToLog()}
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </MuiThemeProvider>
        )
    }

}

export default Login;