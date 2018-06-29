import React from 'react';
import Nav from '../../component/Common/Nav/Nav.jsx';
import Article from '../../component/Article/Article.jsx';
import SideBar from '../../component/Common/SideBar/SideBar.jsx';

import '../../assets/css/style.css'
import '../../assets/css/common.css'

export default class Detail extends React.Component {
    render() {
        return (
            <div className="detail">
                <Nav />
                <div className="news-content-wrapper">
                    <div className="news-content-right">
                        <SideBar />
                    </div>
                    <div className="news-content-left">
                        <Article />
                    </div>
                </div>
            </div>
        )
    }
}