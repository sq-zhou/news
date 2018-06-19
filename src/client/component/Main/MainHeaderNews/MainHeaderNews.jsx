import React from 'react';

import './style.scss';
import personImage from '../../../assets/image/great-person.jpg';

export default class MainHeaderNews extends React.Component {
    render() {
        return (
            <div className="main-header-news">
                <div className="img-wrapper">
                    <img className="img-show" src={personImage} />
                </div>
                <div className="text-content">
                    <h2 className="title">霍金的三次中国之行</h2>
                    <div className="description">游玩西湖之后，霍金一行来到杭州河坊街。在太极茶馆里，霍金津津有味的观看了太极茶道表演。晚6点30分，在一个中餐馆里霍金和同事们一起品尝了中国菜。</div>
                </div>
            </div>
        )
    }
}