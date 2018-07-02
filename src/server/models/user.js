const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', UserScheme);

module.exports = User