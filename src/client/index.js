import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, hashHistory } from "react-router-dom";
import Home from 'Page/Home';
import Detail from 'Page/Detail';
import Manager from 'Page/Manager';
import Login from 'Page/Login';
import Register from 'Page/Register';

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