import React from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './style.scss';
import axios from 'Config/axios';
import api from 'Config/api';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
        }
    }

    componentDidMount() {
      
    }

    loginIn({account, password}) {}

    setLogin() {}

    onUsernameChanged(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onPasswordChanged(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onConfirmPasswordChanged(e) {
        this.setState({
            confirmPassword: e.target.value,
        });
    }

    async register() {
        const { history } = this.props;
        const { username, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert('密码不一致');
            return;
        }

        if (password.length < 6) {
            alert('密码必须大于 6 位');
            return;
        }

        await axios.post(api + '/register', {
            username,
            password,
        });

        history.push('')
    }

    render() {
        return (
            <div className="Login">
                <div className="wrapper">
                    <h2 className="title">注册</h2>
                    <Input type="text" size="default" placeholder="用户名" value={this.state.username}
                           onChange={e => this.onUsernameChanged(e)}/>
                    <span className="line"/>
                    <Input type="password" size="default" placeholder="密码" value={this.state.password}
                           onChange={e => this.onPasswordChanged(e)}/>
                    <span className="line"/>
                    <Input type="password" size="default" placeholder="确认密码" value={this.state.confirmPassword}
                           onChange={e => this.onConfirmPasswordChanged(e)}/>
                    <span className="line"/>
                    <a className="Login-submit" onClick={() => this.register()}>
                        注册
                    </a>
                </div>
            </div>
        )
    }
}
