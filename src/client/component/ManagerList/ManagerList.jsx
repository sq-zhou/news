import React from 'react';
import New from '../../component/Comment/Comment';

import './style.scss';

export default class ManagerList extends React.Component {
    render() {
        return (
            <div className="manager-list">
                <div className="event">
                    <h3>霍金的三次中国之旅</h3>
                    <p className="detail">游玩西湖之后，霍金一行来到杭州河坊街。在太极茶馆里，霍金津津有味的观看了太极茶道表演。晚6点30分，在一个中餐馆里霍金和同事们一起品尝了中国菜。</p>
                </div>
                <div className="news">
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                </div>
                <div className="vertical-line"></div>
            </div>
        )
    }
}
