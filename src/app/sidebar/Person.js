import React from 'react';
import background from '../../../static/minibg.png';
import avatar from '../../../static/avatar.svg';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import DropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

class Person extends React.Component{

    constructor(props, context) {
        super(props, context);
    }

    render(){
        return(
            <div style={{width : '220px', height : '177px', backgroundImage:'url("'+background+'")', backgroundSize:'cover'}}>
                <center>
                    <img src={avatar} style={{marginTop:'10px', width:'120px'}}/>
                </center>
            </div>
        );
    }

}

export default Person;