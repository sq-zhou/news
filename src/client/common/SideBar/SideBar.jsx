import React from 'react'
import EventListNode from '../EventListNode/EventListNode'

import './style.scss'

export default class SideBar extends React.Component{
    render() {
        return (
            <div className="sideBar">
                <div className="sideBar-node">
                    <EventListNode />
                    <EventListNode />
                    <EventListNode />
                </div>
            </div>
        )
    }
}