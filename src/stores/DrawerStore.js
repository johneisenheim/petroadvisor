import flux from 'flux-react';
import actions from '../actions/actions.js';

var DrawerStore = flux.createStore({
    items : {
        values : ['rgba(246, 117, 45, 0.65)','','','','','','']
    },
    actions: [
        actions.selectMenuItem,
        actions.hoverMenuItem,
        actions.dehoverMenuItem
    ],
    selectMenuItem : function(what){
        for ( var i = 0; i < 7; i++ ){
            if( i == parseInt(what)){
                this.items.values[i] = 'rgba(246, 117, 45, 0.65)';
            }else{
                this.items.values[i] = '';
            }
        }
        this.emit('app.drawerchanged');
    },
    hoverMenuItem : function(what){
        var index = parseInt(what);
        if( this.items.values[index] === ''){
            this.items.values[index] = 'rgba(246, 117, 45, 0.3)';
            this.emit('app.drawerhovered');
        }
    },
    dehoverMenuItem : function(what){
        var index = parseInt(what);
        if( this.items.values[index] === 'rgba(246, 117, 45, 0.3)'){
            this.items.values[parseInt(what)] = '';
            this.emit('app.drawerdehovered');
        }
    },
    exports: {
        getListItemsState : function(){
            return this.items;
        }
    }
});

export default DrawerStore;
