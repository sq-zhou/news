import React from 'react';
import EventListNode from '../EventListNode/EventListNode';

import './style.scss';

export default class SideBar extends React.Component {
    render() {
        const { sideBarList } = this.props;
        let nodeList = [];
        if (sideBarList) {
            nodeList = sideBarList.map((value, key) => (
                <EventListNode new={value} key={key} />
            ))
            while (nodeList.length > 3) {
                nodeList.pop();
            }
        }
        return (
            <div className="sideBar">
                <div className="sideBar-node">
                    {nodeList.length > 0 ? nodeList : null}
                </div>
            </div>
        )
    }
}