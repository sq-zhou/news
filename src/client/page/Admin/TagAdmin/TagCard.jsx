import React from 'react';

import { Card, Button, Input, Form } from 'antd';
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
      content,
      date,
      userId,
      newsId,
      user,
    } = nextProps;

    return {
      _id,
      content,
      date,
      userId,
      newsId,
      user,
      ...prevState,
    };
  }

  deleteComment = async e => {
    e.preventDefault();

    const { _id } = this.state;

    await axios.delete(`/api/comment?_id=${_id}`);

    this.props.onDelete && this.props.onDelete();
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
      content,
      user
    } = this.state;

    return (
      <Card
        type="inner"
        title={content.slice(0, 15)}
        extra={
          <Button onClick={this.deleteComment} size="small" type="danger">删除</Button>
        }
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="作者"
          >
            <Input disabled defaultValue={user.username} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="内容"
          >
            <TextArea disabled defaultValue={content} />
          </FormItem>
        </Form>
      </Card>
    )
  }

}

export default TagCard;

