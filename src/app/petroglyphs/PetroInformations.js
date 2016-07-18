import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    grey900, grey300,
    white, darkBlack
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import styles from './PetroInformations.css';
import $ from 'jquery';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Rater from './Rater';
import CircularProgress from 'material-ui/CircularProgress';
import Box from 'react-layout-components';
import GoogleMap from 'google-map-react';
import Marker from './Marker';
import MapControls from './MapControls';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from "react-router";



class PetroInformations extends React.Component{
    constructor(props, context){
        super(props, context);
        console.log(props);
        this.state = {
           results : [],
            loading : false
        };
    }

    componentDidMount(){
        let self = this;
        $.get('http://petroadvisor-archeo.rhcloud.com/petroInformations', {photo_id : this.props.params.petroid}, function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            self.setState({results:parsed});
        }.bind(self));
    }

    onApproveClick(){
        this.setState({
            results : this.state.results,
            loading : true
        });

        $.get('http://petroadvisor-archeo.rhcloud.com/approvePhoto', {photo_id : this.props.params.petroid}, function(data){
            let parsed = JSON.parse(data);
            if(parsed.affectedRows > 0)
                this.props.history.push('/petroglyphs');
        }.bind(this));
    }

    onUnapproveClick(){
        this.setState({
            results : this.state.results,
            loading : true
        });

        $.get('http://petroadvisor-archeo.rhcloud.com/unapprovePhoto', {photo_id : this.props.params.petroid}, function(data){
            let parsed = JSON.parse(data);
            if(parsed.affectedRows > 0)
                this.props.history.push('/petroglyphs');
        }.bind(this));
    }

    render(){
        if(this.state.results.length == 0){
            return(
                <Box justifyContent="center" alignItems="center" style={{height:'100px'}}>
                    <CircularProgress size={0.7}/>
                </Box>
                );
        }else{
            let buttons = [];
            switch(this.state.results[0].visible){
                case 0:
                    if(this.state.loading){
                        buttons.push(
                            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                                <p><span style={{fontWeight:'bold'}}>Wait...</span></p>
                                <CircularProgress size={0.5} innerStyle={{marginTop:'10px'}}/>
                            </div>
                        );
                    }else{
                        buttons.push(
                            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                                <p>Petroglyph status is: <span style={{fontWeight:'bold'}}>Pending</span></p>
                                <Link to="/petroglyphs" style={{color: 'white', textDecoration:'none'}} activeStyle={{color: 'white'}}>
                                    <FlatButton label="Go back"/>
                                </Link>
                                <RaisedButton label="Unapprove Petroglyph" backgroundColor='#C44231' labelStyle={{ color:'#FFFFFF'}} style={{marginRight:'20px'}} onClick={this.onUnapproveClick.bind(this)}/>
                                <RaisedButton label="Approve Petroglyph" backgroundColor='#EDA65C' ref="raised" labelStyle={{ color:'#FFFFFF'}}  onClick={this.onApproveClick.bind(this)}/>
                            </div>
                        );
                    }
                    break;
                case 1:
                    if(this.state.loading){
                        buttons.push(
                            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                                <p><span style={{fontWeight:'bold'}}>Wait...</span></p>
                                <CircularProgress size={0.5} innerStyle={{marginTop:'10px'}}/>
                            </div>
                        );
                    }else {
                        buttons.push(
                            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                                <p>Petroglyph status is: <span style={{fontWeight:'bold'}}>Approved</span></p>
                                <Link to="/petroglyphs" style={{color: 'white', textDecoration:'none'}}
                                      activeStyle={{color: 'white'}}>
                                    <FlatButton label="Go back"/>
                                </Link>
                                <RaisedButton label="Unapprove Petroglyph" ref="raised" backgroundColor='#C44231'
                                              labelColor='#FFFFFF' onClick={this.onUnapproveClick.bind(this)}/>
                            </div>
                        );
                    }
                    break;
                case -1:
                    if(this.state.loading){
                        buttons.push(
                            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                                <p><span style={{fontWeight:'bold'}}>Wait...</span></p>
                                <CircularProgress size={0.5} innerStyle={{marginTop:'10px'}}/>
                            </div>
                        );
                    }else {
                        buttons.push(
                            <div style={{display:"inline-block",marginTop :"30px",textAlign:"center", width:"100%"}}>
                                <p>Petroglyph status is: <span style={{fontWeight:'bold'}}>Unapproved</span></p>
                                <Link to="/petroglyphs" style={{color: 'white', textDecoration:'none'}}
                                      activeStyle={{color: 'white'}}>
                                    <FlatButton label="Go back"/>
                                </Link>
                                <RaisedButton label="Approve Petroglyph" ref="raised" primary={true}
                                              style={{backgroundColor:'#EDA65C'}}
                                              onClick={this.onApproveClick.bind(this)}/>
                            </div>
                        );
                    }
                    break;

            }
            var avatarSrc = "http://petroadvisor-archeo.rhcloud.com/profilePictures/"+this.state.results[0].petroglyph_account_nick+'.png';
            var photoSrc = "http://petroadvisor-archeo.rhcloud.com"+this.state.results[0].url;
            var cardHeaderTitle = this.state.results[0].petroglyph_account_nick;
            var cardHeaderSubtitle = "Photo ID: "+this.state.results[0].id;
            var ratingRender = [];
            for (var i = 0; i < this.state.results.length; i++ ){
                ratingRender.push(
                    <div>
                        <p>Rating for <span style={{fontStyle:'italic'}}>{this.state.results[i].description_it}</span>:</p>
                        <Rater rate={this.state.results[i].rate} />
                    </div>
                );
            }
            return(
                <Paper zDepth={1} style={styles.paper}>
                    <Card>
                        <CardHeader
                            title={cardHeaderTitle}
                            subtitle={cardHeaderSubtitle}
                            avatar={avatarSrc}
                        />
                        <CardMedia
                        >
                            <div>
                                <center><Paper style={{width:'200px', height : '200px', minWidth:'200px', maxWidth:'200px'}} zDepth={2} rounded={false} >
                                    <div style={{backgroundImage:'url('+photoSrc+')', width:'200px', minWidth:'200px', height:'200px', backgroundSize:'cover', backgroundPosition:'center center', backgroundRepeat:'no-repeat', marginBottom:'20px', marginTop:'20px'}}></div>
                                </Paper>
                                    <RaisedButton label="Show full image" primary={true}
                                                  style={{backgroundColor:'#EDA65C', width:'auto', minWidth:'100px', marginTop:'20px'}}/>
                                </center>
                            </div>



                        </CardMedia>
                        <CardTitle title={this.state.results[0].title} subtitle="" />
                        <CardText>
                            {this.state.results[0].description}
                            <Divider style={{marginTop:'30px'}}/>
                            <h3 style={{color:'black', marginTop:'30px'}}>Rating</h3>
                            {ratingRender}
                            <Divider style={{marginTop:'30px'}}/>
                            <h3 style={{color:'black', marginTop:'30px'}}>Petroglyph Location</h3>
                            <div style={{width:'100%', height:'500px'}}>
                                <GoogleMap
                                    options={{scrollwheel: false}}
                                    center={[this.state.results[0].latitude,this.state.results[0].longitude]}
                                    zoom={15}
                                    scrollwheel={false}
                                    bootstrapURLKeys={{
                                        key : 'AIzaSyBvSQsPjuAxbQeMsu4n8XMKtZFP5PPkQHs'
                                    }}
                                >
                                    <Marker lat={this.state.results[0].latitude} lng={this.state.results[0].longitude}/>
                                </GoogleMap>
                            </div>
                            <Divider style={{marginTop:'30px'}} />
                            <MapControls />
                            <Divider style={{marginTop:'30px'}} />
                            {buttons}
                        </CardText>
                    </Card>
                </Paper>
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


export default PetroInformations;