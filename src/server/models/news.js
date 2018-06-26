const mongoose = require('mongoose');

const NewsScheme = mongoose.Schema({
  title: String,
  abstract: String,
  figure: String,
  content: String,
  date: Date,
  link: String,
});

const News = mongoose.model('news', NewsScheme);

module.exports = News;
