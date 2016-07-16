import React from 'react';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Search from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import Sort from 'material-ui/svg-icons/av/sort-by-alpha';
import Eye from 'material-ui/svg-icons/image/remove-red-eye';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    grey900, grey300,
    white, darkBlack
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Folder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import fetch from 'node-fetch';
import $ from 'jquery';
import Box from 'react-layout-components';
import {Link} from "react-router";

import styles from './Petroglyphs.css';


class Petroglyphs extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            results : [],
            limit : 20,
            offset : 0,
            pageNum : 0,
            total : 0
        };
    }

    componentDidMount(){
        let self = this;
        $.get('http://petroadvisor-archeo.rhcloud.com/fetchPetroglyphs', {limit : this.state.limit, offset : this.state.offset}, function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            var total = parsed[0].total[0]["COUNT(*)"];
            self.setState({results:parsed[1], pageNum: Math.ceil(total / 10), total: total, limit : 20, offset : 0});
        }.bind(self));
    }

    onLeftArrowClick(){
        var newOffset = (this.state.offset - 10);
        $.get('http://petroadvisor-archeo.rhcloud.com/fetchPetroglyphs',{ limit: 10, offset: newOffset }, function(data){
            var parsed = JSON.parse(data);
            var total = parsed[0].total[0]["COUNT(*)"];
            this.setState({data: parsed[1], pageNum: Math.ceil(total / 10), total: total, offset:newOffset});
        }.bind(this));
    }

    onRightArrowClick(){
        let newOffset = (this.state.offset + 10);
        $.get('http://petroadvisor-archeo.rhcloud.com/fetchPetroglyphs',{ limit: 10, offset: newOffset }, function(data){
            var parsed = JSON.parse(data);
            var total = parsed[0].total[0]["COUNT(*)"];
            this.setState({data: parsed[1], pageNum: Math.ceil(total / 10), total: total, offset:newOffset});
        }.bind(this));
    }

    _onItemTouchTap(e, child){
        let what = child.props.primaryText.toLowerCase();
        let self = this;
        $.get('http://petroadvisor-archeo.rhcloud.com/fetchAndOrderPetroglyphs', {limit : this.state.limit, offset : this.state.offset, what: what}, function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            var total = parsed[0].total[0]["COUNT(*)"];
            self.setState({results:parsed[1], pageNum: Math.ceil(total / 10), total: total, limit : 20, offset : 0});
        }.bind(self));
    }

    //1 approvato, 0 in pending, -1 non approvato

    render (){
        if(this.state.results.length == 0){
            return(
                <Box justifyContent="center" alignItems="center" style={{height:'100px'}}>
                    <CircularProgress size={0.7}/>
                </Box>
            );
        }else{
            let tableContent = [];
            let url = 'http://petroadvisor-archeo.rhcloud.com/';
            for(var i = 0; i < this.state.results.length; i++ ){
                let routerAddress = '/petroglyphs/'+this.state.results[i].id;
                console.log(routerAddress);
                tableContent[i] =
                    <TableRow>
                        <TableRowColumn style={{width:'30px'}}><Avatar src={url+this.state.results[i].url}/></TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>{this.state.results[i].title}</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>{this.state.results[i].description}</TableRowColumn>
                        <TableRowColumn><span style={this.state.results[i].visible >= 0 ? (this.state.results[i].visible ? {color:"#5F9950"} : {color:'black'}) : {color:"#C44231"}}>{this.state.results[i].visible >= 0 ? (this.state.results[i].visible ? 'Approved' : 'Pending') : 'Unapproved'}</span></TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>{this.state.results[i].petroglyph_account_nick}</TableRowColumn>
                        <TableRowColumn>
                            <Link to={routerAddress} style={{color: 'white', textDecoration:'none'}} activeStyle={{color: 'white'}}>
                                <IconButton><Eye/></IconButton>
                            </Link>
                        </TableRowColumn>
                    </TableRow>
                ;
            }

            return (
                <MuiThemeProvider muiTheme={lightBaseTheme}>
                    <Paper zDepth={1} style={styles.paper}>
                        <Toolbar style={{backgroundColor:'#eea466'}}>
                            <ToolbarTitle text="Petroglyphs" style={{color:'#FFFFFF', textAlign:'center', fontSize:'16px', fontWeight:'bold'}}/>
                            <ToolbarGroup>
                                <FontIcon className="muidocs-icon-custom-sort" />
                                <ToolbarSeparator style={{backgroundColor:'rgba(255,255,255,0.4)'}}/>
                                <ToolbarGroup>
                                    <IconMenu
                                        iconButtonElement={<IconButton><Sort /></IconButton>}
                                        value={1}
                                        iconStyle={{width:'28px', height:'28px', fill:'#FFFFFF'}}
                                        style={{marginLeft:'15px'}}
                                        onItemTouchTap={this._onItemTouchTap.bind(this)}
                                    >
                                        <MenuItem value="1" primaryText="Title" />
                                        <MenuItem value="2" primaryText="Description" />
                                        <MenuItem value="3" primaryText="Nickname" />
                                        <MenuItem value="4" primaryText="Status" />
                                    </IconMenu>
                                    <Search color={'#FFFFFF'} style={{marginTop:'14px', width:'25px', height: '25px', marginRight:'10px', marginLeft:'20px'}}/>
                                    <TextField
                                        hintText="Cerca"
                                        hintStyle = {styles.searchHintStyle}
                                        inputStyle = {styles.searchInputStyle}
                                        underlineFocusStyle = {styles.searchUnderlineFocusStyle}
                                        id={'search'}
                                    />
                                </ToolbarGroup>
                            </ToolbarGroup>
                        </Toolbar>
                        <Table selectable={false}>
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn style={{width:'30px', fontSize:'14px', fontWeight:'bold'}}>Preview</TableHeaderColumn>
                                    <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>Title</TableHeaderColumn>
                                    <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>Description</TableHeaderColumn>
                                    <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>Status</TableHeaderColumn>
                                    <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>User</TableHeaderColumn>
                                    <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>Actions</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} selectable={false}>
                                {tableContent}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableRowColumn style={styles.footerContent}>
                                        <IconButton disabled={this.state.offset === 0} onClick={this.onLeftArrowClick}>
                                            <ChevronLeft/>
                                        </IconButton>
                                        <IconButton disabled={this.state.offset + this.state.limit >= this.state.total} onClick={this.onRightArrowClick}>
                                            <ChevronRight />
                                        </IconButton>
                                    </TableRowColumn>
                                    <TableRowColumn style={styles.footerText}>
                                        {Math.min((this.state.offset + 1), this.state.total) + '-' + Math.min((this.state.offset + this.state.limit), this.state.total) + ' of ' + this.state.total}
                                    </TableRowColumn>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </MuiThemeProvider>
            );
        }
        /*console.log(this.state);
        */
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
        primary1Color: '#EDA65C',
        primary2Color: '#e6af4b',
        primary3Color: '#e6af4b',
        accent1Color: '#EDA65C',
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

export default Petroglyphs;