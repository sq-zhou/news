import React from 'react';
import AuthNav from '../AuthNav';
import { Link } from 'react-router-dom';

import './style.scss';

export default class Nav extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div className="Nav">
            <AuthNav />
            <div className="top-title">
                <h2><Link to="/">新闻聚类</Link></h2>
            </div>
            <div className="menu">
                <span className="item">体育</span>
                <span className="item">科技</span>
                <span className="item">时事</span>
                <span className="item">艺术</span>
                <span className="item">汽车</span>
            </div>
        </div>
        )
    }
}