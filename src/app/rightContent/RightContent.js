import React from 'react';
import Box from 'react-layout-components';
import styles from './RightContent.css.js';

import NavBar from './navbar/NavBar';

class RightContent extends React.Component{
    render(){
        return (
            <div id="b" style={{backgroundColor:"#EFEFEF", width:"100%"}}>
                <NavBar />
                <Box id="gatto" style={{height:'89vh'}}>
                    <div style={{width:'100%', marginLeft : '15px', marginRight:'15px', height : '100%', backgroundColor:'#EFEFEF'}}>
                        {this.props.children}
                    </div>
                </Box>
            </div>
        )
    }
}

export default RightContent;
