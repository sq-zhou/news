import React from 'react';
import { Input } from 'antd';
import axios from 'Config/axios';
import api from 'Config/api';

import 'antd/dist/antd.css';
import './style.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
      
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    async login() {
        const { history } = this.props;
        const { username, password } = this.state;
        await axios.post(api + '/login', {
            username,
            password,
        });
        history.push('/');
    }

    render() {
        return (
            <div className="Login">
                <form className="wrapper">
                    <h2 className="title">登录</h2>
                    <Input type="text" size="default" placeholder="用户名" value={this.state.username}
                           onChange={(e) => this.onChangeUsername(e)}/>
                    <span className="line"/>
                    <Input type="password" size="default" placeholder="密码" value={this.state.password}
                           onChange={(e) => this.onChangePassword(e)}/>
                    <span className="line"/>
                    <a className="Login-submit" onClick={() => this.login()}>
                        登录
                    </a>
                </form>
            </div>
        )
    }
}
