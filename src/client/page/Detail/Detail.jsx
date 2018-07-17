import React from 'react';
import Nav from 'Component/Common/Nav/Nav';
import Article from 'Component/Article';
import SideBar from 'Component/Common/SideBar/SideBar';
import axios from 'Config/axios';
import api from 'Config/api';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            newObj: null,
            newList: [],
            comments: [],
            tagsList: [],
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
        this.fetchNews();

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

        this.fetchComments(id);
        this.fetchTags();
    }

    async fetchTags() {
        const { data } = await axios.get(api + '/tag?isShow=1');

        this.setState({
            tagsList: data,
        });
    }

    async fetchNews() {
        const { data } = await axios.get(api + "/news")
        this.setState({
            newsList: data,
        });
    }

    async fetchComments(id) {
        const { data } = await axios.get(api + "/comment", {
            params: {
                newsId: id
            }
        });

        this.setState({
            comments: data,
        });
    }

    render() {
        const {
            newsList,
            newObj,
            id,
            comments,
            tagsList,
         } = this.state;

        return (
            <div className="detail">
                <Nav tagsList={tagsList} />
                <div className="news-content-wrapper">
                    <div className="news-content-right">
                        <SideBar sideBarList={newsList} />
                    </div>
                    <div className="news-content-left">
                        <Article
                            newObj={newObj}
                            id={id}
                            comments={comments}
                            onSubmit={() => this.fetchComments(id)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}