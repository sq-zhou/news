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
    const id = req.param('id');
    if (_.isUndefined(id)) {
        const collection =  await News.find();
        return res.send(collection);
    }

    const item = await News.findById(id);
    res.send(item);
});

app.listen(3000, () =>
  console.log('Listening on port 3000!')
);
