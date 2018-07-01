import React from 'react';

import './style.scss';

export default class New extends React.Component {
    render() {
        const { type } = this.props;
        let details;
        if (type === "comment") {
            details =
                <div className="relative">
                    <span className="item">评论</span>
                    <span className="item">链接</span>
                    <span className="item">举报</span>
                </div>
        } else if (type === "manager") {
            details =
                <div className="relative">
                    <span className="item">删除</span>
                    <span className="item">修改</span>
                    <span className="item">举报</span>
                </div>
        } else {
            // 暂时代码
            details =
                <div className="relative">
                    <span className="item">评论</span>
                    <span className="item">链接</span>
                    <span className="item">举报</span>
                </div>
        }

        return (
            <div className="new">
                <div className="new-publish">
                    <span className="publisher">花园</span>
                    <span className="time">7天前</span>
                </div>
                <div className="content">
                    <p>电影中所涉及的社会集体xxx，一定要在黑暗中度过，尚未看到光明没这事印度尼西亚华人的写照</p>
                </div>
                {details}
            </div>)
    }
}
