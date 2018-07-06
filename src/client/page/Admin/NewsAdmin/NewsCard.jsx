import React from 'react';

import { Card, Button, Input, Form } from 'antd';
import axios from 'Config/axios';

const FormItem = Form.Item;
const { TextArea } = Input;

class NewsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // title: '',
      // abstract: '',
      // content: '',
      // figure: '',
      // link: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      _id,
      title,
      abstract,
      content,
      figure,
      link,
    } = nextProps;

    return {
      _id,
      title,
      abstract,
      content,
      figure,
      link,
      ...prevState,
    };
  }

  updateInfo = async e => {
    e.preventDefault();

    const {
      _id,
      title,
      abstract,
      content,
      figure,
      link,
    } = this.state;

    await axios.put('/api/news', {
      _id,
      title,
      abstract,
      content,
      figure,
      link,
    });

    alert('更新成功');
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
      title,
      abstract,
      content,
      figure,
      link,
    } = this.state;

    return (
      <Card
        type="inner"
        title={title}
        extra={<Button onClick={this.updateInfo} size="small">更新</Button>}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="标题"
          >
            <Input
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="摘要"
          >
            <TextArea
              rows={4}
              value={abstract}
              onChange={e => this.setState({ abstract: e.target.value })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="内容"
          >
            <TextArea
              rows={4}
              value={content}
              onChange={e => this.setState({ content: e.target.value })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="题图"
          >
            <Input 
              value={figure}
              onChange={e => this.setState({ figure: e.target.value })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="链接"
          >
            <Input
              value={link}
              onChange={e => this.setState({ link: e.target.value })}
            />
          </FormItem>
        </Form>
      </Card>
    );
  }

}

export default NewsCard;
