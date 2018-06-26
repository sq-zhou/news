const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const _ = require('lodash');

const { News } = require('./models');

mongoose.connect('mongodb://localhost/news');

const app = express();

app.use(express.static('dist'));

app.use(function(req, res, next) {
  req.db = mongoose.connection;
  next();
});

app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.get('/api/news', async (req, res) => {
    const collection =  await News.find();
    res.send(collection);
});

app.listen(3000, () =>
  console.log('Listening on port 3000!')
);
