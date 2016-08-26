import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from "react-router";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import {
    lightBlue200, lightBlueA100,lightBlue300,
    grey100, grey300, grey400, grey500,grey900,blue700,
    pinkA200,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

import NavBarStore from '../../../stores/NavBarStore';
import actions from '../../../actions/actions';

import Bell from './Bell';


class NavBar extends React.Component{

    constructor(props, context){
        super(props, context);
        console.log('NavBar props', props);
        this.state = {
            buttonVisible : false
        }
    }

    componentWillMount(){
        NavBarStore.on('app.toggleBackButton', this.toggleBackButton.bind(this));
    }

    componentDidMount(){
        this.setState({
            buttonVisible : false
        })
    }

    toggleBackButton(){
        this.setState({
            buttonVisible : NavBarStore.getButtonVisible()
        })
    }

    leftIconTap(){
        actions.hideBackButton();
        this.props.nav.goBack();
    }

    render(){
        return(
            <MuiThemeProvider muiTheme={lightBaseTheme}>
                <AppBar
                    title=""
                    showMenuIconButton = {this.state.buttonVisible}
                    iconElementRight={
                            <Bell/>
                          }
                    iconElementLeft={
                        <IconButton onTouchTap={this.leftIconTap.bind(this)}><ArrowBack /></IconButton>
                    }

                />
            </MuiThemeProvider>
        )
    }
}

const lightBaseTheme = getMuiTheme({
    spacing: {
        iconSize: 24,
        desktopGutter: 24,
        desktopGutterMore: 32,
        desktopGutterLess: 16,
        desktopGutterMini: 8,
        desktopKeylineIncrement: 64,
        desktopDropDownMenuItemHeight: 32,
        desktopDropDownMenuFontSize: 15,
        desktopDrawerMenuItemHeight: 48,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56,
    },
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#EBE9E6',
        primary2Color: '#e6af4b',
        primary3Color: '#e6af4b',
        accent1Color: '#e6af4b',
        accent2Color: '#e6af4b',
        accent3Color: '#e6af4b',
        textColor: '#666666',
        alternateTextColor: '#666666',
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: '#59C2E6',
        clockCircleColor: fade('#E6E7EB', 0.07),
        shadowColor: grey900,
    },
},{
    userAgent : false
});

export default NavBar;
