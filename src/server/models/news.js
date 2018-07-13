const mongoose = require('mongoose');

const NewsScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  keywords: Array,
  abstract: {
    type: String,
    required: true,
  },
  figure: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const News = mongoose.model('news', NewsScheme);

module.exports = News;
