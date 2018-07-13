import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

function getDateDiff(dateTimeStamp) {
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp.setYear(2017);
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

export default class EventListNode extends React.Component {
    render() {
        if (!this.props.new) {
            return null;
        }
        const { abstract, content, date, figure, link, title, _id } = this.props.new;
        return (
            <div className="event-list-node">
                <div className="event-header-line"></div>
                <div className="side-img">
                    <img src={figure} />
                </div>
                <div className="side-content">
                    <div className="header"></div>
                    <Link to={"/detail/:" + _id}><div className="title">{title}</div></Link>
                    <p className="side-p">{content}</p>
                    <div className="tip">
                        <span className="tip-item"><a href={link}>链接</a></span>
                        <span className="tip-item"><a>1 个月前</a></span>
                        <span className="tip-item"></span>
                    </div>
                </div>
            </div>
        )
    }
}