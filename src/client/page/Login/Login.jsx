import React from 'react'
import { Input } from 'antd';




class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {PromptOpen: false, content: ''}
        this.state = {
            account: '',
            password: ''
        }
    }

    componentDidMount() {
        this.props.getUserInfo().then((flag) => {
            if (flag) Router.push('/index')
        })
    }

    loginIn({account, password}) {
        this.props.userLoginIn({account, password})
    }

    setLogin() {
        this.props.setLoginInfo()
    }

    onChangeUserName(e) {
        this.setState({account: e.target.value})
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    login() {}

    render() {
        return (
            <div className="Login">
                {/* <div className="wrapper">
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
                    <AuthFooter list={['index','register']}/>
                </div> */}

            </div>
        )
    }
}

const Style = {};
Style.login = `
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: #ececec;
`;

Style.wrapper = `
    width: 300px;
    height: 300px;
    padding: 20px;
    border: 1px solid #dddddd;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,.1);
`;
Style.title = `
    text-align: center;
`;
Style.line = `
    display: block;
    width: 100%;
    height: 10px;
`;
Style.loginSubmit = `
    background: #ffffff;
    display: block;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    color: white;
    background: #1890ff;
    letter-spacing: 2px;
`;
Style.input = `
    display: block;
    height: 22px;
    width: 90%;
    padding: 5px 5%;
    margin: 13px 0;
    border-radius: 4px;
    border: 0px;
`;
