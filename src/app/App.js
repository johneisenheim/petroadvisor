import React from 'react';
import { Flex, Box, Grid } from 'reflexbox';
import EasyTransition from 'react-easy-transition';

import PetroTheme from '../theme/PetroTheme';
import Sidebar from './sidebar/Sidebar';
import RightContent from './rightContent/RightContent';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './App.css.js';

class App extends React.Component{

    constructor(props, context) {
        super(props, context);
        console.log('In App props are', props);
        console.log('In App context is', context);
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={PetroTheme}>
                <div>
                    <Grid col={2} px={0}>
                        <Sidebar currentPath={this.props.location} />
                    </Grid>
                    <Grid col={10} px={0} style={{height:"100vh"}}>
                        <RightContent nav={this.props.history}>
                            <div id="pre" style={{width:'100%', height:'100%'}}>
                                {this.props.children}
                            </div>
                        </RightContent>
                    </Grid>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
