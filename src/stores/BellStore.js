import flux from 'flux-react';
import actions from '../actions/actions.js';

var BellStore = flux.createStore({
    status : {
        notified : false
    },
    actions: [
        actions.notify
    ],
    notify : function(){
        console.log('notify action');
        if(this.status.notified)
            this.status.notified = false;
        else this.status.notified = true;
        console.log(this.status);
        this.emit('server.notify');
    },
    exports: {
        getNotificationState : function(){
            console.log('getNotificationState');
            return this.status;
        }
    }
});

export default BellStore;
