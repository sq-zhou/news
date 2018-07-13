const mongoose = require('mongoose');

const TagScheme = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: String,
});

const Tag = mongoose.model('tag', TagScheme);

module.exports = Tag;
