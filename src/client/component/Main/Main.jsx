import React from 'react'
import MainHeaderNews from './MainHeaderNews/MainHeaderNews.jsx'
import EventListNode from '../../component/Common/EventListNode/EventListNode.jsx'

export default class Main extends React.Component {
    render() {
        const { newsList } = this.props;
        let nodeList = null;
        if (newsList) {
            nodeList = newsList.map((value, key) => (
                <div className="event-node-wrapper" key={key}>
                    <EventListNode new={value} />
                </div>
            ))
        }

        return (
            <div className="main">
                <MainHeaderNews />
                <div className="main-event-list">
                    {nodeList}
                </div>
            </div>
        )
    }
}