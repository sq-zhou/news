import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

function formatDate(date) {
    return date.substring(0,10);
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
                    <Link to="/detail"><div className="title">{title}</div></Link>
                    <p className="side-p">{content}</p>
                    <div className="tip">
                        <span className="tip-item"><a href={link}>链接</a></span>
                        <span className="tip-item"><a>{formatDate(date)}</a></span>
                        <span className="tip-item"></span>
                    </div>
                </div>
            </div>
        )
    }
}