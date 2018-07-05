import React from 'react';
import Nav from '../../component/Common/Nav/Nav';
import Main from '../../component/Main/Main';
import SideBar from '../../component/Common/SideBar/SideBar';
import axios from '../../config/axios';
import api from '../../config/api';

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
