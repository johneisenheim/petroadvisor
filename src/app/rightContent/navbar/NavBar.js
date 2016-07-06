import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Call from 'material-ui/svg-icons/communication/call';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import {
    lightBlue200, lightBlueA100,lightBlue300,
    grey100, grey300, grey400, grey500,grey900,blue700,
    pinkA200,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

import Divider from 'material-ui/Divider';

//const darkMuiTheme = getMuiTheme(darkBaseTheme);


class NavBar extends React.Component{

    render(){
        return(
            <MuiThemeProvider muiTheme={lightBaseTheme}>
                <AppBar
                    title=""
                    showMenuIconButton = {false}
                    iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Credits" style={{color:'#666666'}}/>
              <MenuItem primaryText="Logout" style={{color:'#666666'}}/>
            </IconMenu>
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
        primary1Color: '#e8e8e8',
        primary2Color: lightBlue200,
        primary3Color: lightBlue300,
        accent1Color: '#59C2E6',
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: blue700,
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
