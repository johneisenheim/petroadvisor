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
import Attach from 'material-ui/svg-icons/editor/attach-file';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';


class PetroInformations extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            results : [],
            value : 0,
            open : false,
            textValue : '',
            loading : false,
            errorText : 'false',
            image : null
        }
    }

    componentDidMount(){
        $.get('http://petroadvisor-archeo.rhcloud.com/getPetroClasses', function(data){
            let parsed = JSON.parse(data);
            console.log('getPetroClasses results', parsed);
            this.setState({
                results:parsed,
                value : this.state.value
            });
        }.bind(this));
    }

    addClass(){

        if(this.state.textValue == '') {
            this.setState({
                ...this.state,
                errorText: 'This field is required!'
            });
            return;
        }

        if(this.state.image == null){
            alert("Please, specify an image.");
            return;
        }


        this.setState({
            ...this.state,
            loading: true
        });

        var formData = new FormData();
        formData.append('pClass', this.state.textValue);
        var f = this.state.image;
        formData.append("image", this.state.image);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://petroadvisor-archeo.rhcloud.com/addClass",
            "method": "POST",
            "headers": {

            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": formData
        };


        $.ajax(settings).done(function (response) {
            var parsed = JSON.parse(response);
            if(parsed.callState){
                if(parsed.message){
                    //all ok
                    this.setState({
                        ...this.state,
                        open : true,
                        textValue : ''
                    });
                    $.get('http://petroadvisor-archeo.rhcloud.com/getPetroClasses', function(data){
                        let parsed = JSON.parse(data);
                        this.setState({
                            ...this.state,
                            results: parsed,
                            loading : false
                        });
                    }.bind(this));
                }else{
                    alert("There's another class with the name you specified. Please, choose another name.");
                }
            }else{
                alert("Oops. Something went wrong. Please, retry!");
            }
            this.setState({
                ...this.state,
                addLoading : false
            })
        }.bind(this));

    }

    _onRequestClose(){
        this.setState({
            open: false
        })
    }

    _onHandleChange(event){
        this.setState({
            textValue : event.target.value,
            errorText : 'false'
        })
    }

    _onChangeFile(e){
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            var res = reader.result;
            var data = res.replace(/^data:image\/\w+;base64,/, '');

            this.setState({
                ...this.state,
                image: data
            });

        }

        reader.readAsDataURL(file);
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
                let avatarSrc = 'http://petroadvisor-archeo.rhcloud.com/classes/'+this.state.results[i].id+'.png';
                menuItems.push(
                    <ListItem primaryText={this.state.results[i].title} leftAvatar={<Avatar src={avatarSrc} />}/>
                );
            }
            return(
                <div>
                    <Paper zDepth={1} style={styles.paper}>
                        <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                            <p>Here you can create new petroglyph's classes to be mobile users able to recognize the pictograph they are visiting.</p>
                        </div>
                        <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                                <span>Add a new Class:</span>
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
                                    errorText={this.state.errorText === 'false' ? '' : 'This field is required!'}
                                />
                                <FlatButton label="UPLOAD IMAGE" icon={<Attach />} style={{marginLeft:'10px',marginRight:'10px'}}>
                                    <input type="file" style={stylez.inputFile} onChange={this._onChangeFile.bind(this)}/>
                                </FlatButton>
                                {this.state.loading ? <CircularProgress size={0.4}/> : <RaisedButton label="Add Class" ref="raised" backgroundColor='#EDA65C' labelColor='#FFFFFF' style={{marginLeft:'20px'}} onClick={this.addClass.bind(this)}/>}

                            </div>
                            <center><List style={{width:'50%',marginTop:'30px', marginBottom:'30px'}}>
                                <Subheader>Petroglyph's Classes</Subheader>
                                {menuItems}
                            </List></center>
                        </div>
                    </Paper>
                    <Snackbar
                        open={this.state.open}
                        message="Class added successfully!"
                        autoHideDuration={3000}
                        style={{fontFamily:'Roboto', color:'#FFFFFF', fontSize:'15px', textAlign:'center'}}
                        bodyStyle={{backgroundColor:'#F0A95F'}}
                        onRequestClose={this._onRequestClose.bind(this)}
                    />
                </div>
            );
        }
    }
}

const stylez = {
    inputFile : {
        cursor: 'pointer',
        position: 'absolute',
        top: 5,
        bottom: 0,
        right: 0,
        left: 20,
        zIndex:3,
        width: '100%',
        opacity: 0,
    }
};


export default PetroInformations;