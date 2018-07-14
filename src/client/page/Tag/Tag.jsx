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
            newsList: [],
            tagNews: [],
            tagsList: [],
        };
    }

    componentDidMount() {
        const { name } = this.props.match.params;
        this.fetchNews();
        this.fetchTagsNews(name);
        this.fetchTags();
    }

    componentWillReceiveProps(newProps) {
        const oldName = this.props.match.params.name;
        const newName = newProps.match.params.name;

        if (oldName !== newName) {
            this.fetchTagsNews(newName);
        }
    }

    async fetchTagsNews(name) {
        const { data } = await axios.get(api + "/news?tag=" + name);

        this.setState({
            tagNews: data,
        });
    }

    async fetchNews() {
        const { data } = await axios.get(api + "/news");

        this.setState({
            newsList: data,
        });
    }

    async fetchTags() {
        const { data } = await axios.get(api + '/tag?isShow=1');

        this.setState({
            tagsList: data,
        });
    }

    render() {
        const { tagNews, newsList, tagsList } = this.state;
        return (
            <div className="home">
                <Nav tagsList={tagsList} />
                <div className="news-content-wrapper">
                    <div className="news-content-right">
                        <SideBar sideBarList={newsList}/>
                    </div>
                    <div className="news-content-left">
                        <Main newsList={tagNews} />
                    </div>
                </div>
            </div>
        );
    }
}
