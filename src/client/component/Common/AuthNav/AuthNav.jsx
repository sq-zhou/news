import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss'

export default class AuthNav extends React.Component {
    render() {
        return (
        <div className="authNav">
            <div className="notLogin-nav">
                <Link to="/login"><span>登录</span></Link>
                <Link to="/login"><span>登录</span></Link>
            </div>
        </div>)
    }
}