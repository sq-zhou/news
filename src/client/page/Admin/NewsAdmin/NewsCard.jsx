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
      keywords,
    } = nextProps;

    return {
      _id,
      title,
      abstract,
      content,
      figure,
      link,
      keywords,
      keywordsBuffer: keywords.join(" "),
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
      keywords,
    } = this.state;

    await axios.put('/api/news', {
      _id,
      title,
      abstract,
      content,
      figure,
      link,
      keywords,
    });

    alert('更新成功');
  }

  onDelete = async e => {
    e.preventDefault();

    const confirm = window.confirm("是否要删除这个新闻？");

    if (confirm) {
      const { _id } = this.state;

      await axios.delete(`/api/news?_id=${_id}`);

      this.props.onDelete && this.props.onDelete();
      alert('删除成功');
    }
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
      keywordsBuffer,
    } = this.state;

    return (
      <Card
        type="inner"
        title={title}
        extra={
          <div>
            <Button onClick={this.updateInfo} size="small">更新</Button>
            <Button onClick={this.onDelete} size="small" type="danger">删除</Button>
          </div>
        }
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
            label="关键字"
          >
            <Input
              value={keywordsBuffer || ""}
              onChange={e => this.setState({
                keywordsBuffer: e.target.value,
                keywords: e.target.value.split(" "),
              })}
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
