const express = require('express');
const Message = require('../models/message');

const messageRouter = express.Router();

messageRouter.route('/')
.get((req, res, next) => {
    Message.find()
    .then(messages => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(messages);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Message.create(req.body)
    .then(message => {
        console.log('Partner created ', message);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /messages');
})
.delete((req, res, next) => {
    Message.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

messageRouter.route('/:messageId')
.get((req, res, next) => {
    Message.findById(req.params.messageId)
    .then(message => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /messages/${req.params.messageId}`);
})
.put((req, res, next) => {
    Message.findByIdAndUpdate(req.params.messageId, {
        $set: req.body
    }, { new: true })
    .then(message => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Message.findByIdAndDelete(req.params.messageId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = messageRouter;