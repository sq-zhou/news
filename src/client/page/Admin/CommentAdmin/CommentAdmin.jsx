import React from 'react';
import { Card, Button, Input, Form } from 'antd';
import axios from 'Config/axios';
import CommentCard from './CommentCard';

const FormItem = Form.Item;
const { TextArea } = Input;

class CommentAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    this.fetchComments();
  }

  async fetchComments() {
    const { data } = await axios.get('/api/comment');

    this.setState({
      comments: data,
    });
  }

  render() {
    const { comments } = this.state;

    return (
      <div>
        {
          comments
            .map(comment => (
              <CommentCard
                key={comment._id}
                onDelete={() => this.fetchComments()}
                {...comment}
              />
            ))
        }
      </div>
    )
  }

}

export default CommentAdmin
