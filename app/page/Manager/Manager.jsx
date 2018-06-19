import React from 'react';
import ManagerList from '../../component/ManagerList/ManagerList.jsx';
import ManagerMenu from '../../component/ManagerMenu/ManagerMenu.jsx';

import './style.scss';

export default class Manager extends React.Component {
    render() {
        return (
            <div className="manager">
                <header className="head-title">
                    <h2>管理系统</h2>
                </header>
                <div className="manager-warpper">
                    <div className="manager-left">
                        <ManagerMenu />
                    </div>
                    <div className="manager-right">
                        <ManagerList />
                    </div>
                </div>
            </div>
        )
    }
}
