import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    grey900, grey300,
    white, darkBlack
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import styles from './Classes.css';
import $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import Box from 'react-layout-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {List, ListItem} from 'material-ui/List';
import Point from 'material-ui/svg-icons/navigation/chevron-right';
import Subheader from 'material-ui/Subheader';


class PetroInformations extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            results : [],
            value : 0,
            open : false,
            textValue : ''
        }
    }

    componentDidMount(){
        $.get('http://petroadvisor-archeo.rhcloud.com/getPetroClasses', function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            this.setState({
                results:parsed,
                value : this.state.value
            });
        }.bind(this));
    }

    _handleChange(e, value){
        this.setState({
            value : value
        })
    }

    addClass(){
        console.log(this.refs.class.getValue());
        $.get('http://petroadvisor-archeo.rhcloud.com/addClass', {pClass : this.refs.class.getValue()},function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            if(parsed.affectedRows > 0){
                this.setState({
                    open : true,
                    textValue : ''
                });
                this.refs.class.value = '';
                $.get('http://petroadvisor-archeo.rhcloud.com/getPetroClasses', function(data){
                    console.log(data);
                    let parsed = JSON.parse(data);
                    this.setState({
                        results:parsed,
                        value : this.state.value
                    });
                }.bind(this));
            }
        }.bind(this));
    }

    _onRequestClose(){
        this.setState({
            open: false
        })
    }

    _onHandleChange(event){
        this.setState({
            textValue : event.target.value
        })
    }

    render(){
        if(this.state.results.length == 0){
            return(
                <Box justifyContent="center" alignItems="center" style={{height:'100px'}}>
                    <CircularProgress size={0.7}/>
                </Box>
            );
        }else{
            let menuItems = [];
            for(var i = 0; i < this.state.results.length; i++ ){
                menuItems.push(
                    <ListItem primaryText={this.state.results[i].description}/>
                );
            }
            return(
                <div>
                    <Paper zDepth={1} style={styles.paper}>
                        <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                            <p>Here you can create new petroglyph's classes to make mobile users able to recognize the pictograph they are visiting.</p>
                        </div>
                        <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                            <p>Add a new Class:
                                <TextField
                                    hintText="Enter a new petroglyph's class"
                                    hintStyle = {styles.searchHintStyle}
                                    inputStyle = {styles.searchInputStyle}
                                    underlineFocusStyle = {styles.searchUnderlineFocusStyle}
                                    id={'newClass'}
                                    style={{marginLeft:'20px'}}
                                    ref="class"
                                    value={this.state.textValue}
                                    onChange={this._onHandleChange.bind(this)}
                                />
                                <RaisedButton label="Add Class" ref="raised" backgroundColor='#EDA65C'
                                              labelColor='#FFFFFF' style={{marginLeft:'20px'}} onClick={this.addClass.bind(this)}/>
                            </p>
                            <center><List style={{width:'30%', marginBottom:'20px'}}>
                                <Subheader>Petroglyph's Classes</Subheader>
                                {menuItems}
                            </List></center>
                        </div>
                    </Paper>
                    <Snackbar
                        open={this.state.open}
                        message="Class added successfully!"
                        autoHideDuration={3000}
                        style={{fontFamily:'Roboto', bottom:'0px'}}
                        onRequestClose={this._onRequestClose.bind(this)}
                    />
                </div>
            );
        }
    }
}



export default PetroInformations;