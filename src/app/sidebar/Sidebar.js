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
        let sidebarIndex = localStorage.getItem('sidebarIndex');
        if(sidebarIndex !== null){
            actions.selectMenuItem(sidebarIndex);
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
                              nestedItems={[
                                <ListItem primaryText="Unapproved"
                                          key={2}
                                          style={{backgroundColor:this.state.values[2]!=='' ? this.state.values[2] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                                          innerDivStyle = {{paddingLeft:'45px'}}
                                          onClick={this._onClick.bind(this, 2)}
                                          onMouseEnter={this._onMouseEnter.bind(this,2)}
                                          onMouseLeave={this._onMouseLeave.bind(this,2)}
                                          leftIcon={<IconRight style={{fill:'#FFFFFF', marginTop:'11px'}}/>}
                                />,
                                <ListItem primaryText="Approved"
                                          key={3}
                                          style={{backgroundColor:this.state.values[3]!=='' ? this.state.values[3] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                                          innerDivStyle = {{paddingLeft:'45px'}}
                                          leftIcon={<IconRight style={{fill:'#FFFFFF', marginTop:'11px'}}/>}
                                          onClick={this._onClick.bind(this, 3)}
                                          onMouseEnter={this._onMouseEnter.bind(this,3)}
                                          onMouseLeave={this._onMouseLeave.bind(this,3)}

                                />
                              ]}
                    />
                    </Link>
                    <ListItem primaryText="Comments"
                              key={4}
                              style={{backgroundColor:this.state.values[4]!=='' ? this.state.values[4] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                              innerDivStyle = {{paddingLeft:'65px', paddingTop:'21px'}}
                              leftIcon={<CommentsIcon style={{fill:'#FFFFFF', marginTop:'17px'}}/>}
                              onMouseEnter={this._onMouseEnter.bind(this,4)}
                              onMouseLeave={this._onMouseLeave.bind(this,4)}
                              onClick={this._onClick.bind(this, 4)}
                              initiallyOpen={true}
                              autoGenerateNestedIndicator={false}
                              nestedItems={[
                                <ListItem primaryText="Conflicting"
                                          key={5}
                                          style={{backgroundColor:this.state.values[5]!=='' ? this.state.values[5] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                                          innerDivStyle = {{paddingLeft:'45px'}}
                                          onClick={this._onClick.bind(this, 5)}
                                          onMouseEnter={this._onMouseEnter.bind(this,5)}
                                          onMouseLeave={this._onMouseLeave.bind(this,5)}
                                          leftIcon={<IconRight style={{fill:'#FFFFFF', marginTop:'11px'}}/>}
                                />,
                                <ListItem primaryText="Checked"
                                          key={6}
                                          style={{backgroundColor:this.state.values[6]!=='' ? this.state.values[6] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                                          innerDivStyle = {{paddingLeft:'45px'}}
                                          leftIcon={<IconRight style={{fill:'#FFFFFF', marginTop:'11px'}}/>}
                                          onClick={this._onClick.bind(this, 6)}
                                          onMouseEnter={this._onMouseEnter.bind(this,6)}
                                          onMouseLeave={this._onMouseLeave.bind(this,6)}

                                />
                              ]}
                    />
                    <Link to="/classes" style={{color: 'white', textDecoration:'none'}} activeStyle={{color: 'white'}}>
                    <ListItem primaryText="Classes"
                              key={7}
                              style={{backgroundColor:this.state.values[7]!=='' ? this.state.values[7] : '', fontSize:'15px', fontWeight:'500', height:'60px', color:'#FFFFFF'}}
                              innerDivStyle = {{paddingLeft:'65px', paddingTop:'21px'}}
                              leftIcon={<Classes style={{fill:'#FFFFFF', marginTop:'17px'}}/>}
                              onMouseEnter={this._onMouseEnter.bind(this,7)}
                              onMouseLeave={this._onMouseLeave.bind(this,7)}
                              onClick={this._onClick.bind(this, 7)}
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
