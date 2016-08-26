import flux from 'flux-react';
import actions from '../actions/actions.js';

var NavBarStore = flux.createStore({
    status : {
        buttonVisible : false
    },
    actions: [
        actions.showBackButton,
        actions.hideBackButton
    ],
    showBackButton : function(){
        this.status.buttonVisible = true;
        this.emit('app.toggleBackButton');
    },
    hideBackButton : function(){
        this.status.buttonVisible = false;
        this.emit('app.toggleBackButton');
    },
    exports: {
        getButtonVisible : function(){
            return this.status.buttonVisible;
        }
    }
});

export default NavBarStore;
