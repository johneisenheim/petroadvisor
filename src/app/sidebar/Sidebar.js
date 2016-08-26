import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import LogoWhite from '../../../static/aLogo.svg';
import PetroTitle from '../../../static/title.svg';
import RoundedLogo from '../../../static/rounded_logo.svg';
import CommentsIcon from 'material-ui/svg-icons/communication/comment';
import PetroIcon from 'material-ui/svg-icons/places/spa';
import IconRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import Classes from 'material-ui/svg-icons/hardware/toys';
import styles from './Sidebar.css.js';
import {Router, Route, browserHistory} from "react-router";

import DrawerStore from '../../stores/DrawerStore';
import actions from '../../actions/actions.js';
import {Link} from "react-router";

import localStorage from 'localStorage';


import Person from './Person';


class Sidebar extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = DrawerStore.getListItemsState();
    }

    componentWillMount(){
        DrawerStore.on('app.drawerchanged', this.updateState.bind(this));
        DrawerStore.on('app.drawerhovered', this.updateState.bind(this));
        DrawerStore.on('app.drawerdehovered', this.updateState.bind(this));
    }

    componentDidMount(){
        if(this.props.currentPath.pathname === '/'){
            actions.selectMenuItem(0);
        }else if(this.props.currentPath.pathname === '/classes'){
            actions.selectMenuItem(3);
        }else if(this.props.currentPath.pathname.startsWith('/petroglyphs') && this.props.currentPath.pathname.endsWith('/petroglyphs')){
            actions.selectMenuItem(1);
        }else if(this.props.currentPath.pathname.startsWith('/petroglyphs') && !this.props.currentPath.pathname.endsWith('/petroglyphs')){
            actions.selectMenuItem(1);
        }else{
            actions.selectMenuItem(2);
        }
    }

    _onClick(index){
        actions.selectMenuItem(index);
        localStorage.setItem('sidebarIndex', index);
    }

    _onMouseEnter(index){
        actions.hoverMenuItem(index);
    }

    _onMouseLeave(index){
        actions.dehoverMenuItem(index);
    }

    updateState(){
        this.setState(DrawerStore.getListItemsState());
    }

    render(){
        return (
            <div style={styles.drawer}>
                <Person />
                <List ref = "menu" style={{marginTop:'0px', paddingTop:'0px'}}>
                    <Link to="/" style={{color: 'white', textDecoration:'none'}} activeStyle={{color: 'white'}}>
                    <ListItem primaryText="Dashboard"
                              key={0}
                              style={{backgroundColor:this.state.values[0]!=='' ? this.state.values[0] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                              innerDivStyle = {{paddingLeft:'65px', paddingTop:'21px'}}
                              leftIcon={<DashboardIcon style={{fill:'#FFFFFF', marginTop:'17px'}}/>}
                              onClick={this._onClick.bind(this, 0)}
                              onMouseEnter={this._onMouseEnter.bind(this,0)}
                              onMouseLeave={this._onMouseLeave.bind(this,0)}
                    />
                    </Link>
                    <Link to="/petroglyphs" style={{color: 'white', textDecoration:'none'}} activeStyle={{color: 'white'}}>
                    <ListItem primaryText="Petroglyphs"
                              key={1}
                              style={{backgroundColor:this.state.values[1]!=='' ? this.state.values[1] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                              innerDivStyle = {{paddingLeft:'65px', paddingTop:'21px'}}
                              leftIcon={<PetroIcon style={{fill:'#FFFFFF', marginTop:'17px'}}/>}
                              onClick={this._onClick.bind(this, 1)}
                              onMouseEnter={this._onMouseEnter.bind(this,1)}
                              onMouseLeave={this._onMouseLeave.bind(this,1)}
                              initiallyOpen={true}
                              autoGenerateNestedIndicator={false}
                    />
                    </Link>
                    <Link to="/comments" style={{color: 'white', textDecoration:'none'}} activeStyle={{color: 'white'}}>
                    <ListItem primaryText="Comments"
                              key={2}
                              style={{backgroundColor:this.state.values[2]!=='' ? this.state.values[2] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                              innerDivStyle = {{paddingLeft:'65px', paddingTop:'21px'}}
                              leftIcon={<CommentsIcon style={{fill:'#FFFFFF', marginTop:'17px'}}/>}
                              onMouseEnter={this._onMouseEnter.bind(this,2)}
                              onMouseLeave={this._onMouseLeave.bind(this,2)}
                              onClick={this._onClick.bind(this, 2)}
                              initiallyOpen={true}
                              autoGenerateNestedIndicator={false}
                    />
                    </Link>
                    <Link to="/classes" style={{color: 'white', textDecoration:'none'}} activeStyle={{color: 'white'}}>
                    <ListItem primaryText="Classes"
                              key={3}
                              style={{backgroundColor:this.state.values[3]!=='' ? this.state.values[3] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                              innerDivStyle = {{paddingLeft:'65px', paddingTop:'21px'}}
                              leftIcon={<Classes style={{fill:'#FFFFFF', marginTop:'17px'}}/>}
                              onMouseEnter={this._onMouseEnter.bind(this,3)}
                              onMouseLeave={this._onMouseLeave.bind(this,3)}
                              onClick={this._onClick.bind(this, 3)}
                              initiallyOpen={true}
                              autoGenerateNestedIndicator={false}
                    />
                    </Link>
                </List>
            </div>
        )
    }

}

export default Sidebar;
