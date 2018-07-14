import React from 'react';
import AuthNav from '../AuthNav';
import { Link } from 'react-router-dom';

import './style.scss';

export default class Nav extends React.Component{
    render() {
        const { tagsList } = this.props;
        return (
            <div className="Nav">
                <AuthNav />
                <div className="top-title">
                    <h2><Link to="/">新闻聚类</Link></h2>
                </div>
                <div className="menu">
                    {
                        tagsList.map(tag => 
                            (
                            <Link to={`/tag/${tag.name}`}>
                                <span className="item">{tag.name}</span>
                            </Link>
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}