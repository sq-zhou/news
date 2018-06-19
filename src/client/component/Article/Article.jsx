import React from 'react';
import ReactMarkdown from 'react-markdown';
import New from '../New/New.jsx';

import './style.scss'

const input = "``` Javascript var React = require('react'); var Markdown = require('react-markdown');React.render(<Markdown source='# Your markdown here' />,document.getElementById('content'));```"

export default class Article extends React.Component {
    render() {
        return (
            <div className="article">
                <div className="text">
                    <ReactMarkdown source={input} />
                </div>
                <div>
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                </div>
                <div className="submit">
                    <textarea className="submit-text"></textarea>
                    <div className="submit-button">提交</div>
                </div>
            </div>
        )
    }
}