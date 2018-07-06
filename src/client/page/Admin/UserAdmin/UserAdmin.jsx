import React from 'react';
import { Card, Button, Input, Select, Form } from 'antd';
import axios from 'Config/axios';
import api from 'Config/api';

const FormItem = Form.Item;

class UserAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const { data } = await axios.get('/api/user');
    this.setState({
      users: data,
    });
  }

  renderUser(user) {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Card
        type="inner"
        title={user.username}
        extra={<Button size="small">更新</Button>}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="Password"
          >
            <Input type="password" placeholder="Password" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Level"
          >
            <Select defaultValue="normal">
              <Select.Option value="normal">Normal</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </FormItem>
        </Form>
      </Card>
    )
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        {
          users.map(user => this.renderUser(user))
        }
      </div>
    );
  }

}

export default UserAdmin;
