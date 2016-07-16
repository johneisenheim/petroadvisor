import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

import NormalBell from 'material-ui/svg-icons/social/notifications';
import ActiveBell from 'material-ui/svg-icons/social/notifications-active';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import BellStore from '../../../stores/BellStore';


class Bell extends React.Component{

    state = BellStore.getNotificationState()

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
        BellStore.on('server.notify', this.updateStatus.bind(this));
    }

    updateStatus() {
        console.log('newstate');
        this.setState(BellStore.getNotificationState());
        //this.setState({notified: false});
    }

    handleNotify(){
        console.log('NOTIFY FROM CHITEMMUORT');
    }

    render(){
        if(this.state.notified){
            return (
                <div>
                    <ActiveBell style={{fill:'#666666'}}/>
                </div>
            );
        }else{
            return(
                <div>
                    <NormalBell style={{fill:'#666666'}}/>
                </div>

            );
        }
    }

}

export default Bell;

