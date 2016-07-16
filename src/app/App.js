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
                <Box style={{height:"100vh", overflowX:'hidden', backgroundColor:'#f3f3f2'}}>
                    <Sidebar/>
                    <RightContent>
                        <div id="pre" style={{width:'100%', height:'100%'}}>
                            <EasyTransition
                                path={this.props.location.pathname}
                                initialStyle={{opacity: 0, transform: 'translateX(100%)'}}
                                transition="opacity 0.2s ease-in, transform 0.3s ease-in-out 0.3s"
                                finalStyle={{opacity: 1, transform: 'translateX(0%)'}}
                                leaveStyle={{opacity: 0.9, transform: 'translateX(100%)'}}
                                style={{height:'100%'}}
                            >
                                {this.props.children}
                            </EasyTransition>
                        </div>
                    </RightContent>
                </Box>
            </MuiThemeProvider>
        )
    }
}

export default App;
