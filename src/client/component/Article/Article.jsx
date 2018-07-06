import React from 'react';
import EventListNode from '../common/EventListNode/EventListNode';
import New from '../Comment/Comment';
import _ from 'lodash';
import { Input } from 'antd';
const { TextArea } = Input;
import axios from 'Config/axios';
import api from 'Config/api';

import './style.scss'


export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentInputValue: '',
        };
    }

    onTextAreaChanged(e) {
        this.setState({
            commentInputValue: e.target.value,
        });
    }

    async onSubmitClick(e) {
        e.preventDefault();
        const { commentInputValue } = this.state;
        const { id } = this.props;

        if (commentInputValue.length === 0) {
            alert('评论不能为空');
            return;
        }

        await axios.post('/api/comment', {
            content: commentInputValue,
            newsId: id,
        });

        this.setState({
            commentInputValue: '',
        });
    }

    get submitForm() {
        const { user } = this.props;

        if (_.isUndefined(user) || _.isNull(user)) {
            return (
                <div className="submit">
                    <p>请先登录，再评论</p>
                </div>
            )
        }

        const { commentInputValue } = this.state;

        return (
            <form className="submit">
                <TextArea
                    rows={4}
                    value={commentInputValue}
                    onChange={e => this.onTextAreaChanged(e)}
                />
                <div
                    className="submit-button"
                    onClick={e => this.onSubmitClick(e)}
                >
                    提交
                </div>
            </form>
        );
    }

    render() {
        const { user } = this.props;
        return (
            <div className="article">
                <div className="text">
                    {this.props.newObj ? <EventListNode new={this.props.newObj} /> : null}
                </div>
                <div>
                    <New />
                    <New />
                    <New />
                </div>
                {this.submitForm}
            </div>
        )
    }
}