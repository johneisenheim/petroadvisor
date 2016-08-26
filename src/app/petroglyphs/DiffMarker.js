var React = require('react');
var shouldPureComponentUpdate = require('react-pure-render/function');

const K_WIDTH = 20;
const K_HEIGHT = 20;

const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid blue',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

var DiffMarker = React.createClass({
    shouldComponentUpdate : shouldPureComponentUpdate,
    render : function() {
        return (
            <div style={greatPlaceStyle}>{this.props.text}</div>
        );
    }

});

module.exports = DiffMarker;