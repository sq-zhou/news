import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './style.scss';
import personImage from '../../../assets/image/great-person.jpg';

export default class MainHeaderNews extends React.Component {
    render() {
        const { news } = this.props;

        if (_.isUndefined(news)) return null;

        return (
            <div className="main-header-news">
                <div className="img-wrapper">
                    <img className="img-show" src={news.figure} />
                </div>
                <div className="text-content">
                    <Link to={`/detail/:${news._id}`}>
                        <h2 className="title">{news.title}</h2>
                        <div className="description">{news.content}</div>
                    </Link>
                </div>
            </div>
        )
    }
}