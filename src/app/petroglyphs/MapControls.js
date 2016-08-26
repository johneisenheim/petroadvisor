import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class MapControls extends React.Component{

    constructor(props, context){
        super(props, context);
        this.state = {
            value : 0,
            disabled : true,
            lvalue : this.props.currentLocClust
        };
    }

    componentDidMount(){
        this.props.done(this.state.lvalue);
    }

    _handleChange(e, value){
        if( value == 1 ){
            this.setState({
                value : value,
                disabled : false,
                lvalue : this.state.lvalue
            })
        }else{
            this.setState({
                value : value,
                disabled : true,
                lvalue : this.state.lvalue
            })
        }

    }

    _handleChange2(e, value, payload) {
        this.setState({
            value: this.state.value,
            disabled: this.state.disabled,
            lvalue: payload
        });
        this.props.done(payload);
    }

    render(){
        let dropMenu = [];
        if(this.props.status.length !== 0 ){
            for(var i = 0; i < this.props.status.length; i++){
                dropMenu.push(
                    <MenuItem value={this.props.status[i].id} key={i} primaryText={this.props.status[i].id}/>
                );
            }
        }
        return(
            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                <p>Petroglyph is near the site. Does it belongs to that site, or it's a new one?</p>
                <div>
                    <DropDownMenu value={this.state.value} onChange={this._handleChange.bind(this)} style={{color:'black'}}>
                        <MenuItem value={0} primaryText="It belongs to this site"/>
                        <MenuItem value={1} primaryText="It's another site"/>
                    </DropDownMenu>
                    <DropDownMenu value={this.state.lvalue} disabled={this.state.disabled} onChange={this._handleChange2.bind(this)} style={{color:'black'}}>
                        {dropMenu}
                    </DropDownMenu>
                </div>
            </div>
        );
    }

}

export default MapControls;