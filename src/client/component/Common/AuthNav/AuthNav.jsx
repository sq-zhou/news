import React from 'react';

import './style.scss'

export default class AuthNav extends React.Component {
    render() {
        return (
        <div className="authNav">
            <div className="notLogin-nav">
                <span className="">登录</span>
                <span className="">注册</span>
            </div>
        </div>)
    }
}