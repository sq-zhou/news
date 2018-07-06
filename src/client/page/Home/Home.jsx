import React from 'react';
import Nav from 'Component/Common/Nav/Nav';
import Main from 'Component/Main/Main';
import SideBar from 'Component/Common/SideBar/SideBar';
import axios from 'Config/axios';
import api from 'Config/api';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: []
        };
    }

    componentDidMount() {
        this.fetchNews();
    }

    async fetchNews() {
        const { data } = await axios.get(api + "/news");

        this.setState({
            newsList: data,
        });
    }

    render() {
        const { newsList } = this.state;
        return (
            <div className="home">
                <Nav />
                <div className="news-content-wrapper">
                    <div className="news-content-right">
                        <SideBar sideBarList={newsList}/>
                    </div>
                    <div className="news-content-left">
                        <Main newsList={newsList} />
                    </div>
                </div>
            </div>
        );
    }
}
