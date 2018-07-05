import React from 'react';
import MainHeaderNews from './MainHeaderNews/MainHeaderNews';
import EventListNode from '../../component/Common/EventListNode/EventListNode';

export default class Main extends React.Component {
    render() {
        const { newsList } = this.props;
        let nodeList = null;
        if (newsList) {
            nodeList = newsList.map((value, key) => (
                <div className="event-node-wrapper" key={key}>
                    <EventListNode new={value} />
                </div>
            ));
            while (nodeList.length > 5) {
                nodeList.pop();
            }
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