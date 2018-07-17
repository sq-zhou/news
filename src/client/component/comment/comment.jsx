import React from 'react';
import api from '../../config/api';
import axios from '../../config/axios';

import './style.scss';

function getDateDiff(dateTimeStamp) {
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) { return; }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type, content, author, date } = this.props;
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
                    <span className="publisher one">{ author.username }</span>
                    {/* <span className="response">回复</span> <span className="publisher two">zhousq</span> */}
                    <span className="time">{ getDateDiff(new Date(date)) }</span>
                </div>
                <div className="content">
                    <div>{ content }</div>
                </div>
                {details}
            </div>)
    }
}
