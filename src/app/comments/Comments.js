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
import {Link} from "react-router";
import DropDownMenu from 'material-ui/DropDownMenu';
import { Flex, Box, Grid } from 'reflexbox';

import styles from './Comments.css';


export default class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            results : [],
            limit : 10,
            offset : 0,
            pageNum : 0,
            total : 0,
            dropValue: 0,
            loading : true
        };
    }

    componentDidMount(){
        let self = this;
        $.get('http://petroadvisor-archeo.rhcloud.com/getPhotoByComments', {offset : this.state.offset}, function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            console.log(parsed);
            var total = parsed[0];
            self.setState({results:parsed[1], pageNum: Math.ceil(total / 10), total: total, limit : 10, offset : 0, loading:false});
        }.bind(self));
    }

    onLeftArrowClick(){
        var newOffset = (this.state.offset - 10);
        $.get('http://petroadvisor-archeo.rhcloud.com/fetchPetroglyphs',{ limit: 10, offset: newOffset }, function(data){
            var parsed = JSON.parse(data);
            var total = parsed[0].total[0]["COUNT(*)"];
            this.setState({results: parsed[1], pageNum: Math.ceil(total / 10), total: total, offset:newOffset, loading:false});
        }.bind(this));
    }

    onRightArrowClick(){
        let newOffset = (this.state.offset + 10);
        console.log(newOffset)
        $.get('http://petroadvisor-archeo.rhcloud.com/fetchPetroglyphs',{ limit: 10, offset: newOffset }, function(data){
            console.log('hello')
            var parsed = JSON.parse(data);
            console.log(data);
            var total = parsed[0].total[0]["COUNT(*)"];
            this.setState({results: parsed[1], pageNum: Math.ceil(total / 10), total: total, offset:newOffset, loading:false});
        }.bind(this));
    }

    _onItemTouchTap(e, child){
        let what = child.props.primaryText.toLowerCase();
        let self = this;
        $.get('http://petroadvisor-archeo.rhcloud.com/fetchAndOrderPetroglyphs', {limit : this.state.limit, offset : this.state.offset, what: what}, function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            var total = parsed[0].total[0]["COUNT(*)"];
            self.setState({results:parsed[1], pageNum: Math.ceil(total / 10), total: total, limit : 10, offset : 0, loading:false});
        }.bind(self));
    }

    _handleChange(e, value){
        let self = this;
        let status = -2;
        console.log(value);
        switch(value){
            case 0:
                $.get('http://petroadvisor-archeo.rhcloud.com/fetchPetroglyphs', {limit : this.state.limit, offset : this.state.offset}, function(data){
                    console.log(data);
                    let parsed = JSON.parse(data);
                    var total = parsed[0].total[0]["COUNT(*)"];
                    self.setState({results:parsed[1], pageNum: Math.ceil(total / 10), total: total, limit : 10, offset : 0, dropValue:0, loading:false});
                }.bind(self));
                break;
            case 1:
                status = 1;
                break;
            case 2:
                status = -1;
                break;
            case 3:
                status = 0;
                break;
        }
        if( status !== -2 ) {
            $.get('http://petroadvisor-archeo.rhcloud.com/fetchPetroglyphsStatus', {limit : this.state.limit, offset : this.state.offset, status: status}, function(data){
                console.log(data);
                let parsed = JSON.parse(data);
                var total = parsed[0].total[0]["COUNT(*)"];
                self.setState({results:parsed[1], pageNum: Math.ceil(total / 10), total: total, limit : 10, offset : 0, dropValue:value, loading:false});
            }.bind(self));
        }
    }

    _handleTouchTap(address){
        console.log(address);
        this.props.history.push(address);
    }

    render(){
        if(this.state.loading){
            return(
                <Flex align='center' justify="center" flex={true} style={{height:'100vh'}}>
                    <Box align="center" justify="center" flex={true} column={true}>
                        <CircularProgress size={0.7}/>
                    </Box>
                </Flex>
            );
        }else{
            let tableContent = [];
            let url = 'http://petroadvisor-archeo.rhcloud.com/';
            if( this.state.results.length == 0 ){
                tableContent.push(
                    <TableRow>
                        <TableRowColumn style={{width:'30px'}}></TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}></TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}></TableRowColumn>
                        <TableRowColumn><p>No results found!</p></TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}></TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                    </TableRow>
                );
            }else{
                for(var i = 0; i < this.state.results.length; i++ ){
                    let routerAddress = '/petroglyphs/'+this.state.results[i].id;
                    tableContent[i] =
                        <TableRow key={i}>
                            <TableRowColumn style={{width:'30px'}}><Avatar src={url+'/petroglyphs/'+this.state.results[i].photo_id+'.jpg'}/></TableRowColumn>
                            <TableRowColumn style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>{this.state.results[i].account_nickname}</TableRowColumn>
                            <TableRowColumn style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>{this.state.results[i].text}</TableRowColumn>
                            <TableRowColumn><span style={this.state.results[i].visible >= 0 ? (this.state.results[i].visible ? {color:"#5F9950"} : {color:'black'}) : {color:"#C44231"}}>{this.state.results[i].visible >= 0 ? (this.state.results[i].visible ? 'Approved' : 'Pending') : 'Unapproved'}</span></TableRowColumn>
                            <TableRowColumn>

                                <IconButton onTouchTap={this._handleTouchTap.bind(this, routerAddress)}><Eye /></IconButton>

                            </TableRowColumn>
                        </TableRow>
                    ;
                }
            }
            return (
                <MuiThemeProvider muiTheme={lightBaseTheme}>
                    <Flex align="center" justify="center" column={true} style={{overflow:'auto'}}>
                        <Box align="center" justify="center" pl={2} pr={2} column={true} mt={2} pb={4}>
                            <Paper zDepth={1} style={styles.paper}>
                                <Toolbar style={{backgroundColor:'#eea466'}}>
                                    <ToolbarTitle text="Comments" style={{color:'#FFFFFF', textAlign:'center', fontSize:'16px', fontWeight:'bold'}}/>
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
                                            <ToolbarSeparator style={{backgroundColor:'rgba(255,255,255,0.4)'}}/>
                                            <span style={{marginTop:'18px', color:'#FFFFFF', marginLeft:'15px', fontWeight:'bold'}}>Status: </span>
                                            <DropDownMenu value={this.state.dropValue} onChange={this._handleChange.bind(this)} style={{width:'150px', marginRight:'0px'}} labelStyle={{color:'#FFFFFF'}} underlineStyle={{backgroundColor:'#FFFFFF'}} iconStyle={{fill:'#FFFFFF'}} autoWidth={false}>
                                                <MenuItem value={0} primaryText="All" />
                                                <MenuItem value={1} primaryText="Approved" />
                                                <MenuItem value={2} primaryText="Unapproved" />
                                                <MenuItem value={3} primaryText="Pending" />
                                            </DropDownMenu>
                                            <ToolbarSeparator style={{backgroundColor:'rgba(255,255,255,0.4)', marginLeft:'0px'}}/>
                                            <Search color={'#FFFFFF'} style={{marginTop:'15px', width:'25px', height: '25px', marginRight:'0px', marginLeft:'10px'}}/>
                                            <TextField
                                                hintText="Search"
                                                hintStyle = {styles.searchHintStyle}
                                                inputStyle = {styles.searchInputStyle}
                                                underlineFocusStyle = {styles.searchUnderlineFocusStyle}
                                                id={'search'}
                                                style={{marginLeft:'5px'}}
                                            />
                                        </ToolbarGroup>
                                    </ToolbarGroup>
                                </Toolbar>
                                <Table selectable={false}>
                                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn style={{width:'30px', fontSize:'14px', fontWeight:'bold'}}>Preview</TableHeaderColumn>
                                            <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>Title</TableHeaderColumn>
                                            <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>User</TableHeaderColumn>
                                            <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>Status</TableHeaderColumn>
                                            <TableHeaderColumn style={{fontSize:'14px', fontWeight:'bold'}}>Actions</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false} selectable={false}>
                                        {tableContent}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableRowColumn style={styles.footerContent}>
                                                <IconButton disabled={this.state.offset === 0} onTouchTap={this.onLeftArrowClick.bind(this)}>
                                                    <ChevronLeft/>
                                                </IconButton>
                                                <IconButton disabled={this.state.offset + this.state.limit >= this.state.total} onTouchTap={this.onRightArrowClick.bind(this)}>
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
                        </Box>
                    </Flex>
                </MuiThemeProvider>
            );
        }
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