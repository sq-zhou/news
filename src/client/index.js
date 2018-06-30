import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, hashHistory } from "react-router-dom";
import Home from './page/Home/Home.jsx';
import Detail from './page/Detail/Detail.jsx';
import Manager from './page/Manager/Manager.jsx';
import Login from './page/Login/Login.jsx'

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route history={hashHistory}>
                <Route path="/detail/:_id" component={Detail} />
            </Route>
            <Route path="/manager" component={Manager} />
            <Route path="/login" component={Login}/>
        </div>
    </Router>
    , document.getElementById('app'));