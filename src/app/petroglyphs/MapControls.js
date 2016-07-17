import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class MapControls extends React.Component{

    constructor(props, context){
        super(props, context);
        this.state = {
            value : 0,
            disabled : true
        }
    }

    _handleChange(e, value){
        this.setState({
            value : value,
            disabled : this.state.disabled
        })
    }

    render(){
        return(
            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                <p>Petroglyph is near the site. Does it belongs to that site, or it's a new one?</p>
                <div>
                    <DropDownMenu value={this.state.value} onChange={this._handleChange.bind(this)} style={{color:'black'}}>
                        <MenuItem value={0} primaryText="It belongs to this site"/>
                        <MenuItem value={1} primaryText="It's another site"/>
                    </DropDownMenu>
                    <DropDownMenu value={this.state.value} disabled={this.state.disabled} onChange={this._handleChange.bind(this)} style={{color:'black'}}>
                        <MenuItem value={0} primaryText="It belongs to this site"/>
                        <MenuItem value={1} primaryText="It's another site"/>
                    </DropDownMenu>
                </div>
            </div>
        );
    }

}

export default MapControls;