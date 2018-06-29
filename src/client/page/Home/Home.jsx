import React from 'react';
import Nav from '../../component/Common/Nav/Nav.jsx';
import Main from '../../component/Main/Main.jsx';
import SideBar from '../../component/Common/SideBar/SideBar.jsx';
import axios from '../../config/axios';
import api from '../../config/api';

import '../../assets/css/style.css';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newList: []
        };
    }

    componentDidMount() {
        axios.get(api + "/news")
            .then(res => {
                this.setState({
                    newsList: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { newsList } = this.state;
        return (
            <div className="home">
                <Nav />
                <div className="news-content-wrapper">
                    <div className="news-content-right">
                        <SideBar />
                    </div>
                    <div className="news-content-left">
                        <Main newsList={newsList} />
                    </div>
                </div>
            </div>
        );
    }
}
