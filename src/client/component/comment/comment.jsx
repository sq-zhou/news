import React from 'react';
import api from '../../config/api';
import axios from '../../config/axios';

import './style.scss';

export default class New extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    register() {
        axios.post(api + '/user/register', {
            username: 'sqz',
            password: 'asqw'
        })
    }

    login() {
        axios.post(api + '/user/login', {
            username: 'sqz',
            password: 'asqw'
        })
    }

    render() {
        const { type } = this.props;
        let details;
        if (type === "comment") {
            details =
                <div className="relative">
                    <span className="item">举报</span>
                </div>
        } else if (type === "manager") {
            details =
                <div className="relative">
                    <span className="item">举报</span>
                </div>
        } else {
            // 暂时代码
            details =
                <div className="relative">
                    <span className="item">回复</span>
                    <span className="item">举报</span>
                </div>
        }

        return (
            <div className="new">
                <div className="new-publish">
                    <span className="publisher one" onClick={this.register}>sqz</span>
                    <span className="response">回复</span>
                    <span className="publisher two" onClick={this.login}>zhousq</span>
                    <span className="time">7天前</span>
                </div>
                <div className="content">
                    <div>电影中所涉及的社会集体xxx，一定要在黑暗中度过，尚未看到光明没这事印度尼西亚华人的写照</div>
                </div>
                {details}
            </div>)
    }
}
