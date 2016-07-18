import React from "react";
import {Router, Route, browserHistory, IndexRoute, RouterContext} from "react-router";

import Main from "./Main";
import Home from '../app/home/Home';
import Petroglyphs from '../app/petroglyphs/Petroglyphs';
import PetroInformations from '../app/petroglyphs/PetroInformations';
import Classes from '../app/petroglyphs/Classes';
import localStorage from 'localStorage';

/**
 * The React Router routes for both the server and the client.
 */


module.exports = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            <Route path="petroglyphs" component={Petroglyphs} />
            <Route path="petroglyphs/:petroid" component={PetroInformations} />
            <Route path="classes" component={Classes} />
        </Route>
    </Router>
);
