import React from 'react';
import { Card, Button, Input, Select, Form } from 'antd';
import axios from 'Config/axios';

const FormItem = Form.Item;

class TagAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  componentDidMount() {
    this.fetchTags();
  }

  async fetchTags() {
    const { data } = await axios.get('/api/tag');
    this.setState({
      tags: data,
    });
  }

  render() {
    const { tags } = this.state;
    return (
      <div>
        <Button type="primary">新增</Button>
        {
          tags.map(user => <div></div>)
        }
      </div>
    );
  }

}

export default TagAdmin;
