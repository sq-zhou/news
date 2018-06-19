import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './page/Home/Home.jsx';
import Detail from './page/Detail/Detail.jsx';
import Manager from './page/Manager/Manager.jsx';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/detail" component={Detail} />
            <Route path="/manager" component={Manager} />
        </div>
    </Router>
    , document.getElementById('app'));