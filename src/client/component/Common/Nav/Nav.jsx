import React from 'react';
import AuthNav from '../AuthNav/AuthNav';

import './style.scss';

export default class Nav extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div className="Nav">
            <AuthNav {...this.props} />
            <div className="top-title">
                <h2>新闻聚类</h2>
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