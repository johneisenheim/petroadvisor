import React from 'react';
import {Box, Flex} from 'react-layout-components';
import EasyTransition from 'react-easy-transition';

import PetroTheme from '../theme/PetroTheme';
import Sidebar from './sidebar/Sidebar';
import RightContent from './rightContent/RightContent';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './App.css.js';

class App extends React.Component{

    constructor(props, context) {
        super(props, context);
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={PetroTheme}>
                <Box style={{height:"100vh", overflowX:'auto', backgroundColor:'#f3f3f2'}}>
                    <Sidebar currentPath={this.props.location} />
                    <RightContent>
                        <div id="pre" style={{width:'100%', height:'100%'}}>
                                {this.props.children}
                        </div>
                    </RightContent>
                </Box>
            </MuiThemeProvider>
        )
    }
}

export default App;
