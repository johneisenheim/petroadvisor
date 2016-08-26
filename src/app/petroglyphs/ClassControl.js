import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Attach from 'material-ui/svg-icons/editor/attach-file';
import styles from './ClassControl.css';
import 'whatwg-fetch';

export default class ClassControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            addLoading : false,
            classInProps : this.props.petroClass,
            checkedValue : 0,
            showInsertForm : false,
            textValue : '',
            errorText : 'false',
            dropdownClassObject : null,
            image : null
        }
    }

    componentWillMount(){
        let self = this;
        $.get('http://petroadvisor-archeo.rhcloud.com/getPetroClasses', function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            let value = 0;
            for(let i = 0; i < parsed.length; i++){
                if(parsed[i].title == this.state.classInProps)
                    value = i;
            }
            var tt = parsed[value];
            self.setState({
                ...this.state,
                checkedValue : value,
                dropdownClassObject : tt,
                data:parsed
            });
            this.props.done(tt);
        }.bind(self));
    }

    _handleChange(e,value){
        let v = this.state.data[value];
        this.setState({
            ...this.state,
            checkedValue : value,
            dropDownClassObject : v
        });

        this.props.done(v);
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
            addLoading: true
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
                    $.get('http://petroadvisor-archeo.rhcloud.com/getPetroClasses', function(data){
                        console.log(data);
                        let parsed = JSON.parse(data);
                        let value = 0;
                        for(let i = 0; i < parsed.length; i++){
                            if(parsed[i].title == this.state.textValue)
                                value = i;
                        }
                        var tt = parsed[value];
                        this.setState({
                            ...this.state,
                            checkedValue : value,
                            data:parsed,
                            addLoading : false,
                            dropdownClassObject : tt
                        });
                        this.props.done(tt);
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

    toggleClassForm(){
        this.setState({
            ...this.state,
            showInsertForm: !this.state.showInsertForm
        });
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

    _onHandleChange(event){
        this.setState({
            ...this.state,
            textValue : event.target.value,
            errorText : 'false'
        });
    }

    render(){
        let dropMenu = [];
        if(this.state.data.length !== 0 ){
            for(var i = 0; i < this.state.data.length; i++){
                dropMenu.push(
                    <MenuItem value={i} key={i} primaryText={this.state.data[i].title}/>
                );
            }
        }
        return(
            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                <p>User has identified this petroglyph belonging to the following class. It is correct?</p>
                <div>
                    <DropDownMenu value={this.state.checkedValue} onChange={this._handleChange.bind(this)} style={{color:'black'}}>
                        {dropMenu}
                    </DropDownMenu>
                    <RaisedButton label='Add a new Class' ref="raised" backgroundColor='#EDA65C' labelColor='#FFFFFF' style={{marginLeft:'20px'}} onClick={this.toggleClassForm.bind(this)}/>
                </div>
                {this.state.showInsertForm ?
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

                                    <FlatButton label="UPLOAD IMAGE" icon={<Attach />}
                                                style={{marginLeft:'10px',marginRight:'10px'}}>
                                        <input type="file" style={stylez.inputFile} ref="file"
                                               onChange={this._onChangeFile.bind(this)} accept="image/*"/>
                                    </FlatButton>
                            {this.state.addLoading ? <CircularProgress size={0.4} style={{marginTop:'-50px'}}/> :
                                    <RaisedButton label="Add Class" ref="raised" backgroundColor='#EDA65C'
                                                  labelColor='#FFFFFF' style={{marginLeft:'20px'}}
                                                  onClick={this.addClass.bind(this)}/>}




                        </div>
                    </div>

                    : <div></div>}
            </div>
        );
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
        opacity: 0
    }
};