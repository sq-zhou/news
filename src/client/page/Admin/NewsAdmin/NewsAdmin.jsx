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

  render() {
    const { newsList } = this.state;

    return (
      <div>
        {
          newsList.map(news => (
            <NewsCard
              key={news._id}
              onDelete={() => this.fetchNews()}
              {...news}
            />
          ))
        }
      </div>
    )
  }

}

export default NewsAdmin;
