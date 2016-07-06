import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';

const PetroTheme = getMuiTheme({
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
        primary1Color: '#e6af4b',
        accent1Color: '#f6752e',
        textColor: Colors.grey600,
        alternateTextColor: Colors.grey50,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: fade(Colors.darkBlack, 0.3),
        pickerHeaderColor: '#e6984b',
        clockCircleColor: fade('#E6E7EB', 0.07),
        shadowColor: Colors.grey900,
    },
},{
    userAgent : false
});

export default PetroTheme;