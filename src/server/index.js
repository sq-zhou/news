const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const _ = require('lodash');
const assert = require('assert');
const md5 = require("crypto").createHash("md5");

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
    return res.status(200).send({
        message: 'success',
    });
});

app.post('/api/user/login', async (req, res) => {
    const { body } = req;
    const { username, password } = body;
    const repassword = User.find({ username });
    if (!repassword) {
        return res.status(200).send({
            message: '用户名不存在!'
        });
    }
    if (repassword === md5.update(password).digest("hex")) {
        return res.status(200).send({
            message: 'success'
        });
    } else {
        return res.status(200).send({
            message: '密码错误！'
        });
    }

})

app.post('/api/user/register', async (req, res) => {
    const { body } = req;
    const { username, password } = body;
    const cryptoPassword = md5.update(password).digest("hex");
    try {
        await User.create({
            username,
            password: cryptoPassword
        })
        return res.status(200).send({
            message: 'success'
        });
    } catch (error) {
        return res.status(500).send({
            message: 'erroe'
        });
    }
   
})
app.listen(3000, () =>
    console.log('Listening on port 3000!')
);
