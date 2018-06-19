import React from 'react';
import Nav from '../../common/Nav/Nav.jsx';
import Main from '../../component/Main/Main.jsx';
import SideBar from '../../common/SideBar/SideBar.jsx';

import '../../assets/css/style.css'

export default class Index extends React.Component {
    render() {
        return (
            <div className="home">
                <Nav />
                <div className="news-content-wrapper">
                    <div className="news-content-right">
                        <SideBar />
                    </div>
                    <div className="news-content-left">
                        <Main />
                    </div>
                </div>
            </div>
        );
    }
}
