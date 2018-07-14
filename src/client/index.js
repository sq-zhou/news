import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, hashHistory } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Home from 'Page/Home';
import Tag from 'Page/Tag';
import Detail from 'Page/Detail';
import Manager from 'Page/Manager';
import Login from 'Page/Login';
import Register from 'Page/Register';
import Admin from 'Page/Admin';

import './assets/css/style.css';
import './assets/css/common.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route history={hashHistory}>
                    <Route path="/detail/:_id" component={Detail} />
                </Route>
                <Route path="/manager" component={Manager} />
                <Route path="/tag/:name" component={Tag} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/admin" exact component={Admin} />
                <Route path="/admin/user" exact component={Admin} />
                <Route path="/admin/news" exact component={Admin} />
                <Route path="/admin/comment" exact component={Admin} />
                <Route path="/admin/tag" exact component={Admin} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('app'));