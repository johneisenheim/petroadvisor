import React from 'react';

import NavBar from './navbar/NavBar';

class RightContent extends React.Component{
    constructor(props, context){
        super(props, context);
        console.log('From RightContent context is', context);
        console.log('From RightContent props is', props);
    }
    render(){
        return (
            <div id="b" style={{backgroundColor:"#EFEFEF", width:"100%", height:"100vh"}}>
                <NavBar nav={this.props.nav}/>
                <div id="gatto" style={{overflow:'auto', paddingBottom:'10px', height:'100%'}}>
                    <div style={{width:'100%', height : '100%', backgroundColor:'#EFEFEF'}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default RightContent;
