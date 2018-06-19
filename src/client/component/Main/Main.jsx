import React from 'react'
import MainHeaderNews from './MainHeaderNews/MainHeaderNews.jsx'
import EventListNode from '../../common/EventListNode/EventListNode.jsx'

export default class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <MainHeaderNews />
                <div className="main-event-list">
                    <div className="event-node-wrapper">
                        <EventListNode />
                    </div>
                    <div className="event-node-wrapper">
                        <EventListNode />
                    </div>
                    <div className="event-node-wrapper">
                        <EventListNode />
                    </div>
                    <div className="event-node-wrapper">
                        <EventListNode />
                    </div>
                </div>
            </div>
        )
    }
}