var React = require('react');
import FontIcon from 'material-ui/FontIcon';
import {grey300} from 'material-ui/styles/colors';
import Star from 'material-ui/svg-icons/toggle/star';

class Rater extends React.Component{
    constructor(props, context){
        super(props, context);
    }

    render(){
        var stars = [];
        var grayStarsNumber = (5-this.props.rate);
        var orangeStarsNumber = (5-grayStarsNumber);
        var counterKey = 0;

        if( orangeStarsNumber > 5 || orangeStarsNumber <= 0){
            orangeStarsNumber = 5;
            grayStarsNumber = 0;
        }

        for ( var i = 1; i <= orangeStarsNumber; i++ ){
            stars.push(
                <Star
                    key={counterKey}
                    className="material-icons"
                    style={iconStyles}
                    color='#e6af4b'
                />
            );
            counterKey++;
        }

        for ( var i = 1; i<= grayStarsNumber; i++ ){
            stars.push(
                <Star
                    key={counterKey}
                    className="material-icons"
                    style={iconStyles}
                    color={grey300}
                />
            )
            counterKey++;
        }
        return(
            <div style={divStyle}>
                {stars}
            </div>
        );
    }
}

const style = {
    height: 'auto',
    width: '100%',
    marginTop : 20,
    //textAlign: 'center',
    position: 'relative',
    marginBottom : 20
};


const iconStyles = {
    marginRight: 15
};

const divStyle = {
    display : 'inline-block'
};


export default Rater;