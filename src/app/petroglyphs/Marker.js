var React = require('react');
var shouldPureComponentUpdate = require('react-pure-render/function');

const K_WIDTH = 40;
const K_HEIGHT = 40;

const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #f6752e',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#f6752e',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

var Marker = React.createClass({
    shouldComponentUpdate : shouldPureComponentUpdate,
    render : function() {
        return (
            <div style={greatPlaceStyle}>P</div>
        );
    }

});

module.exports = Marker;