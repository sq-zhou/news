import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import imageOfFirstLadyOfUSA from '../../assets/image/imageOfFirstLadyOfUSA.jpg';

export default class EventListNode extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="event-list-node">
                <div className="event-header-line"></div>
                <div className="side-img">
                    <img src={imageOfFirstLadyOfUSA} />
                </div>
                <div className="side-content">
                    <div className="header">一月18日</div>
                    <Link to="/detail"><div className="title">霍金的到来</div></Link>
                    
                    <p className="side-p">霍金的到来，吸引了无数的游人，为了能让霍金在餐馆里安静的吃顿饭，工作人员动用了大量的保安、警察，并且将马路中间的一大块地方也围了起来。</p>
                    <div className="tip">
                        <span className="tip-item">话题</span>
                        <span className="tip-item">国际</span>
                        <span className="tip-item">新闻</span>
                    </div>
                </div>
            </div>
        )
    }
}