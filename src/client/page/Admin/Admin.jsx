import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import UserAdmin from './UserAdmin';
import NewsAdmin from './NewsAdmin';
import CommentAdmin from './CommentAdmin';

import './styles.scss'

const { Header, Content, Footer, Sider } = Layout;

class Admin extends React.Component {

  constructor(props) {
    super(props);
  }

  handleMenuClick = e => {
    const { history } = this.props;
    const { key } = e;

    switch(key) {
      case 'user':
        return history.push('/admin/user');
      case 'news':
        return history.push('/admin/news');
      case 'comment':
        return history.push('/admin/comment');
    }
  }

  get selectedKeys() {
    const { pathname } = this.props.location;
    switch(pathname) {
      case '/admin':
      case '/admin/user':
        return ['user'];
      case '/admin/news':
        return ['news'];
      case '/admin/comment':
        return ['comment'];
    }
  }

  get headerContent() {
    const { pathname } = this.props.location;
    switch(pathname) {
      case '/admin':
      case '/admin/user':
        return '用户管理';
      case '/admin/news':
        return '新闻管理';
      case '/admin/comment':
        return '评论管理';
    }
  }

  get contentControl() {
    const { pathname } = this.props.location;
    switch(pathname) {
      case '/admin':
      case '/admin/user':
        return <UserAdmin />;
      case '/admin/news':
        return <NewsAdmin />;
      case '/admin/comment':
        return <CommentAdmin />;
    }
  }

  render() {
    return (
      <Layout style={{
        height: '100%',
      }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={this.selectedKeys}
            onClick={this.handleMenuClick}
          >
            <Menu.Item key="user">
              <Icon type="user" />
              <span className="nav-text">User</span>
            </Menu.Item>
            <Menu.Item key="news">
              <Icon type="video-camera" />
              <span className="nav-text">News</span>
            </Menu.Item>
            <Menu.Item key="comment">
              <Icon type="upload" />
              <span className="nav-text">Comment</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, paddingLeft:24 }}>
            <h1>{this.headerContent}</h1>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.contentControl}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }

}

export default Admin;
