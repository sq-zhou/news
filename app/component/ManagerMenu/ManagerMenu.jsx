import React from 'react';

import './style.scss';

export default class ManagerMenu extends React.Component {
    render() {
        return (
            <div className="manager-menu">
                <div className="menu selected">新闻</div>
                <div className="menu">评论</div>
                <div className="menu">用户</div>
            </div>
        )
    }
}
