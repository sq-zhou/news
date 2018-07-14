import React from 'react';
import { Card, Button, Input, Select, Form } from 'antd';
import axios from 'Config/axios';
import TagCard from './TagCard'

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

  handleAddClick = async e => {
    e.preventDefault();

    await axios.post('/api/tag', {
      name: 'Untitled',
    });

    await this.fetchTags();
  }

  handleCardUpdate = () => {
    this.fetchTags();
  }

  render() {
    const { tags } = this.state;
    return (
      <div>
        <Button onClick={this.handleAddClick} type="primary">新增</Button>
        {
          tags.map(tag => <TagCard key={tag.name} onUpdate={this.handleCardUpdate} {...tag} />)
        }
      </div>
    );
  }

}

export default TagAdmin;
