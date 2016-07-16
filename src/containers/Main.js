import React from "react";
import InlineCss from "react-inline-css";
import Transmit from "react-transmit";

import favicon from "favicon.ico";
import injectTapEventPlugin from 'react-tap-event-plugin';

import Login from '../login/Login';
import App from '../app/App';

injectTapEventPlugin();

/**
 * Main React application entry-point for both the server and client.
 */
class Main extends React.Component {


	constructor(props, context){
		super(props,context);
	}
	/**
	 * componentWillMount() runs on server and client.
	 */
	componentWillMount () {
		if (__SERVER__) {
			console.log("Hello server");
		}

		if (__CLIENT__) {
			console.log("Hello client");
		}
	}

	/**
	 * Runs on server and client.
	 */
	render () {
        return(
            <App {...this.props} />
        );
	}
}

export default Main;
