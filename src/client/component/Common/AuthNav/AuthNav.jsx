import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss'

export default class AuthNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: false
        };
    }

    render() {
        const { loginStatus } = this.state;
        let showInfo;
        if (loginStatus === false) {
            showInfo = (
                <div className="notLogin-nav">
                    <Link to="/login"><span>登录</span></Link>
                    <Link to="/register"><span>注册</span></Link>
                </div>
            )
        } else {
            showInfo = (
                <div className="login-nav">
                    <span>用户名</span>
                </div>
            )
        }

        return (
            <div className="authNav">
                {showInfo}
            </div>)
    }
}