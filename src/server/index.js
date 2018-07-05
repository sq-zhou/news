const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors')
const _ = require('lodash');
const assert = require('assert');
const crypto = require('crypto');

const sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
};

const {
    News,
    Comment,
    User,
} = require('./models');

mongoose.connect('mongodb://127.0.0.1/news');

const app = express();

const hashPassword = source => crypto
    .createHash('sha256')
    .update(source)
    .digest('base64');

app.use(function (req, res, next) {
    req.db = mongoose.connection;
    next();
});
app.use(session(sess));
app.use(express.static('dist'));
app.use(bodyParser.json())

/**
 *  News
 */
app.get('/api/news', async (req, res) => {
    const {
        id,
        offset,
        limit,
    } = req.query;

    if (_.isUndefined(id)) {
        const collection = await News
            .find()
            .sort({date: -1})
            .skip(offset || 0)
            .limit(limit || 20);
        return res.send(collection);
    }

    const item = await News.findById(id);
    res.send(item);
});

app.get('/api/latestNews', async (req, res) => {
    const {
        offset,
        limit,
    } = req.query;

    const collection = await News
        .find()
        .sort({date: -1})
        .skip(offset || 0)
        .limit(limit || 20);
    return res.send(collection);
});

/**
 * Comment
 */
app.get('/api/comment', async (req, res) => {
    const {
        newsId,
        id: commentId,
        offset,
        limit,
    } = req.query;

    if (!_.isUndefined(commentId)) {
        const item = await Comment.findById(commentId);
        return res.send(item);
    }

    if (!_.isUndefined(newsId)) {
        const collection = await Comment
            .find({ newsId })
            .sort({date: -1})
            .skip(offset || 0)
            .limit(limit || 20);
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
    return res.send({
        message: 'success',
    });
});

/**
 * User
 */
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user !== null) {
        return res.status(400).send({
            message: 'username already exist',
        })
    }
    await User.create({
        username,
        password: hashPassword(password),
        createAt: new Date(),
    });
    return res.send({
        message: 'success',
    });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            username,
        });
        if (user === null) {
            return res.status(404).send({
                message: 'user not found',
            });
        }
        const hashPass = hashPassword(password);
        if (user.password !== hashPass) {
            return res.status(400).send({
                message: 'invalid password',
            });
        }
        req.session.uid = user._id;
        return res.send({
            message: 'success',
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: 'unknown error',
        });
    }
});

app.post('/api/logout', async (req, res) => {
    if (typeof req.session.uid !== 'undefined') {
        delete req.session.uid;
    }
    res.send({
        message: 'success',
    });
});

app.get('/api/user/me', async (req, res) => {
    if (typeof req.session.uid === 'undefined') {
        return res.status(404).send({
            message: 'please login',
        });
    }
    let user;
    try {
        user = await User.findById(req.session.uid);
        const { username, createAt } = user;
        return res.send({
            username,
            createAt,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: 'unknown message',
        });
    }
});

app.listen(3000, () =>
    console.log('Listening on port 3000!')
);
