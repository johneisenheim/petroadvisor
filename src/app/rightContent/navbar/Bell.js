import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

import NormalBell from 'material-ui/svg-icons/social/notifications';
import ActiveBell from 'material-ui/svg-icons/social/notifications-active';

import CommentsIcon from 'material-ui/svg-icons/communication/comment';
import PhotoIcons from 'material-ui/svg-icons/places/spa';
import $ from 'jquery';
import Divider from 'material-ui/Divider';



class Bell extends React.Component{

    newComments = 0
    newPhoto = 0
    interval = null

    constructor(props, context) {
        super(props, context);
        this.state = {
            notification : false
        }
    }

    updateStatus() {
        console.log('newstate');
        this.setState({
            notification : true
        });
        //this.setState({notified: false});
    }

    componentDidMount(){
        var self = this;
        self.interval = setInterval(function(){
            $.get('http://petroadvisor-archeo.rhcloud.com/notify', function(data){
                //console.log(data);
                var parsed = JSON.parse(data);
                if( parsed.c_count > 0 )
                    self.newComments = parsed.c_count;
                else self.newComments = 0;
                if( parsed.p_count > 0 )
                    self.newPhoto = parsed.p_count;
                else self.newPhoto = 0;
                if( self.newComments > 0 || self.newPhoto > 0)
                    self.setState({notification:true});
                else self.setState({notification:false});

            }.bind(self));
        },1000);
    }

    _onTouchComments(){
        var self = this;
        $.get('http://petroadvisor-archeo.rhcloud.com/denotify', function(data){}.bind(self));

    }

    render(){
        let menuToAppend = [];

        if(this.newComments > 0){
            let text = 'You have '+ this.newComments+' new comments!';
            menuToAppend.push(
                <MenuItem primaryText={text} leftIcon={<CommentsIcon />} onTouchTap={this._onTouchComments.bind(this)}></MenuItem>
            );
        }

        if(this.newPhoto > 0){
            let text = 'You have '+ this.newPhoto+' new comments!';
            if( this.newComments > 0 )
                menuToAppend.push(
                    <Divider />
                );

            menuToAppend.push(
                <MenuItem primaryText={text} leftIcon={<PhotoIcons />}></MenuItem>
            )

        }

        /*return (
            <IconMenu
                iconButtonElement={this.state.notification > 0 ? <IconButton><ActiveBell style={{fill:'#C44231'}} /></IconButton> : <IconButton><NormalBell style={{fill:'#666666'}}/></IconButton>}
            >
                {menuToAppend}
            </IconMenu>
        );*/

        return (
            <IconMenu
                iconButtonElement={this.state.notification ? <IconButton><ActiveBell style={{fill:'#C44231'}}/></IconButton> : <IconButton><NormalBell style={{fill:'#666666'}}/></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            {menuToAppend}
            </IconMenu>
        );
    }

}

export default Bell;

