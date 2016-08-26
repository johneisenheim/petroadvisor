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
import DiffMarker from './DiffMarker';
import MapControls from './MapControls';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from "react-router";
import ClassControl from './ClassControl';


class PetroInformations extends React.Component{
    constructor(props, context){
        super(props, context);
        console.log(props);
        this.state = {
            results : [],
            loading : false,
            location_cluster : []
        };

        this.myDictionary = {
            mapControlResults :'',
            classControlResults : ''
        };
    }

    componentDidMount(){
        let self = this;
        let parsed1 = null;
        $.get('http://petroadvisor-archeo.rhcloud.com/petroInformations', {photo_id : this.props.params.petroid}, function(data){
            console.log(data);
            parsed1 = JSON.parse(data);
            self.setState({results:parsed1});
        }.bind(self));

        $.post('http://petroadvisor-archeo.rhcloud.com/getAllLocationCluster', function(data){
            console.log(data);
            let parsed = JSON.parse(data);
            self.setState({location_cluster:parsed});
        }.bind(self));
    }

    onApproveClick(){
        this.setState({
            ...this.state,
            loading : true
        });

        $.get('http://petroadvisor-archeo.rhcloud.com/approvePhoto', {photo_id : this.props.params.petroid, location_cluster: this.myDictionary.mapControlResults, class_id: this.myDictionary.classControlResults.id}, function(data){
            let parsed = JSON.parse(data);
            if(parsed.affectedRows > 0)
                this.props.history.push('/petroglyphs');
        }.bind(this));
    }

    classControlDone(value){
        console.log('classControlDone', value);
        this.myDictionary.classControlResults = value;
    }

    mapControlDone(value){
        console.log('mapControlDone', value);
        this.myDictionary.mapControlResults = value;
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

            let markerToRender = [];
            if(this.state.location_cluster.length > 0){
                for (var i = 0 ; i < this.state.location_cluster.length; i++){
                    markerToRender.push(
                        <DiffMarker lat={this.state.location_cluster[i].latitude} lng={this.state.location_cluster[i].longitude} text={this.state.location_cluster[i].id}/>
                    );
                }
            }
            console.log(this.state.results[0]);
            var avatarSrc = "http://petroadvisor-archeo.rhcloud.com/profilePictures/"+this.state.results[0].nickname+'.png';
            var photoSrc = "http://petroadvisor-archeo.rhcloud.com"+this.state.results[0].url;
            var cardHeaderTitle = this.state.results[0].nickname;
            var cardHeaderSubtitle = "Photo ID: "+this.state.results[0].id;
            var ratingRender = [];
            //for (var i = 0; i < this.state.results.length; i++ ){
            ratingRender.push(
                <div>
                    <p>Rating for <span style={{fontStyle:'italic'}}>visibility</span>:</p>
                    <Rater rate={this.state.results[0].vis_rate} />
                </div>
            );
            ratingRender.push(
                <div>
                    <p>Rating for <span style={{fontStyle:'italic'}}>reachability</span>:</p>
                    <Rater rate={this.state.results[0].reach_rate} />
                </div>
            );
            //}
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
                                <img src={photoSrc} />
                            </CardMedia>
                            <CardTitle title={this.state.results[0].title} subtitle="" />
                            <CardText>
                                {this.state.results[0].description}
                                <Divider style={{marginTop:'30px'}}/>
                                <h3 style={{color:'#5C5C5C', marginTop:'30px'}}>Rating</h3>
                                {ratingRender}
                                <Divider style={{marginTop:'30px'}}/>
                                <h3 style={{color:'#5C5C5C', marginTop:'30px'}}>Class</h3>
                                <ClassControl petroClass={this.state.results[0].classes_id} done={this.classControlDone.bind(this)}/>
                                <Divider style={{marginTop:'30px'}}/>
                                <h3 style={{color:'#5C5C5C', marginTop:'30px'}}>Petroglyph Location</h3>
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
                                        {markerToRender}
                                    </GoogleMap>
                                </div>
                                <Divider style={{marginTop:'30px'}} />
                                <MapControls status={this.state.location_cluster} currentLocClust={this.state.results[0].location_cluster_id} done={this.mapControlDone.bind(this)}/>
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
        textColor: '#5C5C5C',
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