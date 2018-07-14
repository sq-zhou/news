const mongoose = require('mongoose');

const TagScheme = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  isShow: Boolean,
  description: String,
});

const Tag = mongoose.model('tag', TagScheme);

module.exports = Tag;
