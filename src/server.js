import babelPolyfill from "babel-polyfill";
import koa from "koa";
import koaProxy from "koa-proxy";
import koaStatic from "koa-static";
import React from "react";
import ReactDOM from "react-dom/server";
import * as ReactRouter from "react-router";
import Transmit from "react-transmit";

import http from 'http';
import express from 'express';

import actions from './actions/actions';

import routesContainer from "containers/routes";
import favicon from "favicon.ico";



function onRequest_a (req, res) {
	actions.notify();
	res.write('Response from 9011\n');
	res.end();
}

let expressApp = express();


try {
	const app      = koa();
	const hostname = process.env.HOSTNAME || "localhost";
	const port     = process.env.PORT || 8000;
	let   routes   = routesContainer;

	app.use(function *(next) {
		yield ((callback) => {
			const webserver = __PRODUCTION__ ? "" : `//${this.hostname}:8080`;
			const location  = this.path;

			ReactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
				if (redirectLocation) {
					this.redirect(redirectLocation.pathname + redirectLocation.search, "/");
					return;
				}

				if (error || !renderProps) {
					callback(error);
					return;
				}

				const styles = {};

				const StyleProvider = React.createClass({
					childContextTypes:{
						styles:    React.PropTypes.array,
						insertCss: React.PropTypes.func
					},

					getChildContext () {
						return {
							styles,
							insertCss (style) { styles[style] = style._getCss(); }
						};
					},

					render () {
						return <ReactRouter.RouterContext {...this.props} />;
					}
				});

				Transmit.renderToString(StyleProvider, renderProps).then(({reactString, reactData}) => {
					let cssModules = "";

					Object.keys(styles).forEach((style) => { cssModules += styles[style]; });

					let template = (
						`<!doctype html>
						<html lang="en-us">
							<head>
								<meta charset="utf-8" />
								<title>PetroAdvisor</title>
								<link rel="shortcut icon" href="${favicon}" />
								<style>${cssModules}</style>
								<style>
									.react-layout-components--box {
									  display: -webkit-box;
									  display: -moz-box;
									  display: -ms-flexbox;
									  display: -webkit-flex;
									  display: flex;
									}
									.wrapper {
										position : relative;
									}
									.blur-filter {
									  	filter: blur(5px);
										-webkit-filter: blur(10px);
										-moz-filter: blur(10px);
										-o-filter: blur(10px);
										-ms-filter: blur(10px);
										margin: -5px -10px -10px -5px;
									}
									#no-blur-filter {
									  	filter: none;
										-webkit-filter: blur(0px);
										-moz-filter: blur(0px);
										-o-filter: blur(0px);
										-ms-filter: blur(0px);

									}
									.resize-image{
										width: 200px;
										height: 200px;
										background-size: cover;
										background-position: center center;
										background-repeat: no-repeat;
										margin-bottom: 20px;

									}
								</style>
							</head>
							<body style="width:100%; height:100%;margin:0px;">
								<div id="react-root">${reactString}</div>
							</body>
						</html>`
					);

					this.type = "text/html";
					this.body = Transmit.injectIntoMarkup(template, reactData, [`${webserver}/dist/client.js`]);

					callback(null);
				}).catch(e => {
					callback(e);
				});
			});
		});

	});

	app.listen(port, () => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to http://%s:%s", hostname, port);
	});

	if (__DEV__) {
		if (module.hot) {
			console.log("[HMR] Waiting for server-side updates");

			module.hot.accept("containers/routes", () => {
				routes = require("containers/routes");
			});

			module.hot.addStatusHandler((status) => {
				if (status === "abort") {
					setTimeout(() => process.exit(0), 0);
				}
			});
		}
	}
}
catch (error) {
	console.error(error.stack || error);

	throw error;
}

expressApp.post('/', function(req, res){
	console.log('here in server.');
	actions.notify();
	res.end();
});
http.createServer(expressApp).listen('9011', function(){
	console.log('second server is listening');
});
/*var io = require('socket.io').listen(server);
var	socket = require('socket-io-server');

socket.init(server);

expressApp.get('/cane', function(req, res){
	socket.emitAll('emit-clients', {
		data: []
	});
	res.end();
});

expressApp.listen('9011', function (){
	console.log('Express server listening on port');
});*/