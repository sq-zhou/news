import React from 'react';
import { Input } from 'antd';

import 'antd/dist/antd.css';
import './style.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {PromptOpen: false, content: ''}
        this.state = {
            account: '',
            password: ''
        }
    }

    componentDidMount() {
      
    }

    loginIn({account, password}) {}

    setLogin() {}

    onChangeUserName(e) {
    }

    onChangePassword(e) {
    }

    login() {}

    render() {
        return (
            <div className="Login">
                <div className="wrapper">
                    <h2 className="title">L-技术</h2>
                    <Input type="text" size="default" placeholder="用户名" value={this.state.account}
                           onChange={(e) => this.onChangeUserName(e)}/>
                    <span className="line"/>
                    <Input type="password" size="default" placeholder="密码" value={this.state.password}
                           onChange={(e) => this.onChangePassword(e)}/>
                    <span className="line"/>
                    <a className="Login-submit" onClick={() => {
                        this.login()
                    }}>登录</a>
                </div>
            </div>
        )
    }
}
