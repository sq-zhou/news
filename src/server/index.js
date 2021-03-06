const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors')
const _ = require('lodash');
const assert = require('assert');
const crypto = require('crypto');

const {
    News,
    Tag,
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
app.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
    }),
}));
app.use(express.static('dist'));
app.use(bodyParser.json())

/**
 *  Tag
 */
app.get('/api/tag', async (req, res) => {
    const {
        name,
        offset,
        limit,
    } = req.query;

    if (_.isUndefined(name)) {
        let isShow = req.query.isShow;

        if (_.isUndefined(isShow)) {
            const collection = await Tag
                .find({ isShow })
                .skip(offset || 0)
                .limit(limit || 20);
            return res.send(collection.map(item => _.omit(item.toObject(), ['__v'])));
        } else {
            isShow = isShow === "1";
            const collection = await Tag
                .find({ isShow })
                .skip(offset || 0)
                .limit(limit || 20);
            return res.send(collection.map(item => _.omit(item.toObject(), ['__v'])));
        }

    }

    const item = await Tag.findOne({ name });
    res.send(item);
});

app.post('/api/tag', async (req, res) => {
    const { name, description } = req.body;
    await Tag.create({
        name,
        description,
        isShow: false,
    });

    res.send({
        message: 'success',
    });
});

app.put('/api/tag', async (req, res) => {
    const { _id, ...rest } = req.body;

    if (_.isUndefined(_id)) {
        return res.status(404).send({
            message: '缺少 _id',
        });
    }
    
    await Tag.findOneAndUpdate(
        { _id },
        rest,
    );

    res.send({
        message: 'success',
    });
})

app.delete('/api/tag', async (req, res) => {
    const { _id } = req.query;

    await Tag.deleteOne({ _id });
    
    return res.send({
        message: 'success',
    });
})

/**
 *  News
 */
app.get('/api/news', async (req, res) => {
    const {
        id,
        tag,
        offset,
        limit,
    } = req.query;

    if (_.isUndefined(id)) {
        if (_.isUndefined(tag)) {
            const collection = await News
                .find()
                .sort({date: -1})
                .skip(offset || 0)
                .limit(limit || 20);
            return res.send(collection);
        } else {
            const collection = await News
                .find({
                    keywords: tag,
                })
                .sort({date: -1})
                .skip(offset || 0)
                .limit(limit || 20);
            return res.send(collection);
        }
    }

    const item = await News.findById(id);
    res.send(item);
});

app.put('/api/news', async (req, res) => {
    const {_id, ...rest} = req.body;

    if (_.isUndefined(_id)) {
        return res.status(404).send({
            message: '缺少 id',
        });
    }

    await News.findOneAndUpdate(
        {_id},
        {
            ...rest,
        },
    );

    res.send({
        message: 'success',
    });
});

app.delete('/api/news', async (req, res) => {
    const { _id } = req.query;
    await News.deleteOne({ _id });
    return res.send({
        message: 'success',
    });
})

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
        const result = [];

        for (let i = 0; i < collection.length; i++) {
            const comment = collection[i].toObject();
            const { userId, newsId, __v, ...rest } = comment;
            const user = await User.findById(userId);
            if (user === null) {
                continue;
            }
            result.push({
                author:  _.pick(user.toObject(), ['username', 'createAt']),
                ...rest,
            });
        }

        return res.send(result);
    }

    const collection = await Comment
        .find()
        .sort({date: -1})
        .skip(offset || 0)
        .limit(limit || 20);
    
    const comments = collection.map(comment => _.omit(comment.toObject(), ['__v']))

    const result = [];
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const user = await User.findById(comment.userId);
            if (user === null) {
                continue;
            }
        result.push({
            ...comment,
            user: _.omit(user.toObject(), ['password', '__v']),
        });
    }
    
    return res.send(result);
});

app.post('/api/comment', async (req, res) => {
    const { uid } = req.session;
    if (_.isUndefined(uid) || _.isNull(uid)) {
        return res.status(500).send({
            message: 'please login',
        });
    }
    const user = await User.findById(uid);
    if (_.isNull(user)) {
        return res.status(500).send({
            message: 'user not exist',
        });
    }
    const { newsId, content } = req.body;
    await Comment.create({
        newsId,
        content,
        userId: uid,
        date: new Date(),
    });
    return res.send({
        message: 'success',
    });
});

app.delete('/api/comment', async (req, res) => {
    const { _id } = req.query;
    await Comment.deleteOne({ _id });
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
        level: 'normal',
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
        const { username, createAt, level } = user;
        return res.send({
            username,
            createAt,
            level: level || 'normal',
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: 'unknown message',
        });
    }
});

app.get('/api/user', async (req, res) => {
    const {
        id,
        offset,
        limit,
    } = req.query;

    if (_.isUndefined(id)) {
        const collection = await User
            .find()
            .sort({createAt: -1})
            .skip(offset || 0)
            .limit(limit || 20);
        return res.send(collection.map(item => {
            const obj = item.toObject();
            return _.omit(obj, ['__v', 'password']);
        }));
    }

    const item = await User.findById(id);
    res.send(item);
});

app.listen(3000, () =>
    console.log('Listening on port 3000!')
);
