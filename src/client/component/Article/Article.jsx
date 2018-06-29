import React from 'C:/Users/Administrator.BF-201701130007/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import ReactMarkdown from 'react-markdown';
import EventListNode from '../common/EventListNode/EventListNode'
import New from '../New/New';

import './style.scss'

const input = "``` Javascript var React = require('react'); var Markdown = require('react-markdown');React.render(<Markdown source='# Your markdown here' />,document.getElementById('content'));```"

export default class Article extends React.Component {
    render() {
        console.log(this.props.newObj)
        return (
            <div className="article">
                <div className="text">
                    {this.props.newObj ? <EventListNode new={this.props.newObj} /> : null}
                </div>
                <div>
                </div>
                <div className="submit">
                    <textarea className="submit-text"></textarea>
                    <div className="submit-button">提交</div>
                </div>
            </div>
        )
    }
}