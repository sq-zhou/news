import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'Config/axios';
import api from 'Config/api';

import './style.scss'

export default class AuthNav extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchUser();
    }

    async fetchUser() {
        const { login } = this.props;
        try {
            const resp = await axios.get(api + "/user/me");
            const user = resp.data;
            window.__USER__ = user;
            login(user);
        } catch (e) {
            console.log(e);
        };
    }

    render() {
        const { user } = this.props;
        let showInfo;
        if (user === null) {
            showInfo = (
                <div className="notLogin-nav">
                    <Link to="/login"><span>登录</span></Link>
                    <Link to="/register"><span>注册</span></Link>
                </div>
            )
        } else {
            showInfo = (
                <div className="login-nav">
                    <span>已登陆： { user.username }</span>
                </div>
            )
        }

        return (
            <div className="authNav">
                {showInfo}
            </div>)
    }
}