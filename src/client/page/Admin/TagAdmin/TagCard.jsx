import React from 'react';

import { Card, Button, Input, Form, Checkbox } from 'antd';
import axios from 'Config/axios';

const FormItem = Form.Item;
const { TextArea } = Input;

class TagCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      _id,
      name,
      isShow,
      description,
    } = nextProps;

    return {
      _id,
      name,
      isShow,
      description,
      ...prevState,
    };
  }

  deleteComment = async e => {
    e.preventDefault();

    const { _id } = this.state;

    await axios.delete(`/api/tag?_id=${_id}`);

    this.props.onUpdate && this.props.onUpdate();
  }

  updateComment = async e => {
    e.preventDefault();

    const {
      _id,
      name,
      isShow,
      description,
    } = this.state;

    await axios.put('/api/tag', {
      _id,
      name,
      isShow,
      description,
    });

    alert('更新成功');

    this.props.onUpdate && this.props.onUpdate();
  }

  handleNameInput = e => {
    this.setState({
      name: e.target.value,
    });
  }

  handleIsShow = e => {
    this.setState({
      isShow: e.target.checked,
    });
  }

  handleDescriptionInput = e => {
    this.setState({
      description: e.target.value,
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const {
      name,
      isShow,
      description, 
    } = this.state;

    return (
      <Card
        type="inner"
        title={name}
        extra={
          <div>
            <Button onClick={this.updateComment} size="small" type="default">更新</Button>
            <Button onClick={this.deleteComment} size="small" type="danger">删除</Button>
          </div>
        }
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="名字"
          >
            <Input value={name} onChange={this.handleNameInput} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否展示"
          >
            <Checkbox checked={isShow} onChange={this.handleIsShow} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            <TextArea value={description || ''} onChange={this.handleDescriptionInput} />
          </FormItem>
        </Form>
      </Card>
    )
  }

}

export default TagCard;

