const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const _ = require('lodash');
const assert = require('assert');

const frontendHost = 'http://localhost:8080'
const corsConfig = {
    origin: function (origin, callback) {
        if (frontendHost.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
};

const {
    News,
    Comment,
    User,
} = require('./models');

mongoose.connect('mongodb://localhost/news');

const app = express();

app.use(cors(corsConfig));
app.use(express.static('dist'));
app.use(bodyParser.json())

app.use(function (req, res, next) {
    req.db = mongoose.connection;
    next();
});

app.get('/api/news', async (req, res) => {
    const id = req.param('id');
    if (_.isUndefined(id)) {
        const collection = await News.find();
        return res.send(collection);
    }

    const item = await News.findById(id);
    res.send(item);
});

app.get('/api/comment', async (req, res) => {
    const {
        newsId,
        id: commentId,
    } = req.query;

    if (!_.isUndefined(commentId)) {
        const item = await Comment.findById(commentId);
        return res.send(item);
    }

    if (!_.isUndefined(newsId)) {
        const collection = await Comment.find({ newsId });
        return res.send(collection);
    }

    return res.status(404).send({
        error: "Please provide id or newsId",
    });
});

app.post('/api/comment', async (req, res) => {
    const { body } = req;
    await Comment.create({
        ...body,
        date: new Date(),
    });
    return res.status(200).send({
        message: 'success',
    });
});

app.listen(3000, () =>
    console.log('Listening on port 3000!')
);
