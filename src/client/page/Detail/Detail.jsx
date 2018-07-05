import React from 'react';
import Nav from 'Component/Common/Nav/Nav';
import Article from 'Component/Article/Article';
import SideBar from 'Component/Common/SideBar/SideBar';
import axios from 'Config/axios';
import api from 'Config/api';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            newObj: null,
            newList: []
        };
        this.splitId = this.splitId.bind(this);
    }

    // 切割_id(多出一个:)获取评论_id
    splitId(_id) {
        return _id.substring(1);
    }

    componentDidMount() {
        const id = this.splitId(this.props.match.params._id);
        this.setState({
            id: id
        });
        // 请求sideBar数据
        axios.get(api + "/news")
            .then(res => {
                this.setState({
                    newsList: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
        // 请求news数据
        axios.get(api + "/news", {
            params: {
                id: id
            }
        })
            .then((res) => {
                this.setState({
                    newObj: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
        // 请求评论数据
        axios.get(api + "/comment", {
            params: {
                newsId: id
            }
        })
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { newsList, newObj } = this.state;
        return (
            <div className="detail">
                <Nav />
                <div className="news-content-wrapper">
                    <div className="news-content-right">
                        <SideBar sideBarList={newsList} />
                    </div>
                    <div className="news-content-left">
                        <Article newObj={newObj} />
                    </div>
                </div>
            </div>
        )
    }
}