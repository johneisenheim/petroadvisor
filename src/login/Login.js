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

class Login extends React.Component{

    constructor(props, context) {
        super(props, context);
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
                                <Checkbox
                                    label="Ricordami d'ora in poi"
                                    style = {styles.rememberMe}
                                    labelStyle = {{marginLeft : "-10px"}}
                                />
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </MuiThemeProvider>
        )
    }

}

export default Login;