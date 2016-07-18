import React from "react";
import InlineCss from "react-inline-css";
import Transmit from "react-transmit";

import favicon from "favicon.ico";
import injectTapEventPlugin from 'react-tap-event-plugin';

import Login from '../login/Login';
import App from '../app/App';

import localStorage from 'localStorage';

injectTapEventPlugin();

/**
 * Main React application entry-point for both the server and client.
 */
class Main extends React.Component {

    auth = null;

	constructor(props, context){
		super(props,context);
		this.state = {
			auth : this.auth
		};
        console.log(this.state);
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

        this.auth = localStorage.getItem('petrologin') == null ? 0 : localStorage.getItem('petrologin');
        console.log('hello', this.auth);
	}

	/**
	 * Runs on server and client.
	 */
	render () {
            if(!this.auth){
                return <Login {...this.props}/>;
            }else return <App {...this.props} />;

	}
}

export default Main;
