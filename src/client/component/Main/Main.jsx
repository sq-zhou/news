import React from 'react';
import MainHeaderNews from './MainHeaderNews/MainHeaderNews';
import EventListNode from '../../component/Common/EventListNode/EventListNode';

export default class Main extends React.Component {
    render() {
        const { newsList, showHeader } = this.props;
        if (showHeader) {
            const [head, ...tail] = newsList;

            let nodeList = null;
            if (newsList && tail) {
                nodeList = tail.map((value, key) => (
                    <div className="event-node-wrapper" key={key}>
                        <EventListNode new={value} />
                    </div>
                ));

                while (nodeList.length > 15) {
                    nodeList.pop();
                }
            }


            return (
                <div className="main">
                    <MainHeaderNews news={head} />
                    <div className="main-event-list">
                        {nodeList}
                    </div>
                </div>
            )
        } else {
            let nodeList = null;
            if (newsList) {
                nodeList = newsList.map((value, key) => (
                    <div className="event-node-wrapper" key={key}>
                        <EventListNode new={value} />
                    </div>
                ));

                while (nodeList.length > 15) {
                    nodeList.pop();
                }
            }


            return (
                <div className="main">
                    <div className="main-event-list">
                        {nodeList}
                    </div>
                </div>
            )

        }
    }
}