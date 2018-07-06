import React from 'react';
import { Card, Button, Input, Form } from 'antd';
import NewsCard from './NewsCard';
import axios from 'Config/axios';

const FormItem = Form.Item;
const { TextArea } = Input;

class NewsAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  async fetchNews() {
    const { data } = await axios.get('/api/news');
    this.setState({
      newsList: data,
    });
  }

  renderNews(news) {
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

    return (
      <Card
        type="inner"
        title={news.title}
        extra={<Button size="small">更新</Button>}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="标题"
          >
            <Input value={news.title} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="摘要"
          >
            <TextArea
              rows={4}
              value={news.abstract}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="内容"
          >
            <TextArea
              rows={4}
              value={news.content}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="题图"
          >
            <Input value={news.figure} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="链接"
          >
            <Input value={news.link} />
          </FormItem>
        </Form>
      </Card>
    )
  }

  render() {
    const { newsList } = this.state;

    return (
      <div>
        {
          newsList.map(news => <NewsCard key={news._id} {...news}/>)
        }
      </div>
    )
  }

}

export default NewsAdmin;
