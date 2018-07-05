import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, hashHistory } from "react-router-dom";
import Home from './page/Home/Home';
import Detail from './page/Detail/Detail';
import Manager from './page/Manager/Manager';
import Login from './page/Login/Login';
import Register from './page/Register/Register';

import './assets/css/style.css';
import './assets/css/common.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route history={hashHistory}>
                <Route path="/detail/:_id" component={Detail} />
            </Route>
            <Route path="/manager" component={Manager} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </div>
    </Router>
    , document.getElementById('app'));