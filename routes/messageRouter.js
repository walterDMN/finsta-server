const express = require('express');
const messageRouter = express.Router();

messageRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the messages to you');
})
.post((req, res) => {
    res.end(`Will add the message: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /messages');
})
.delete((req, res) => {
    res.end('Deleting all messages');
});

messageRouter.route('/:messageId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the message: ${req.params.messageId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /messages/${req.params.messageId}`);
})
.put((req, res) => {
    res.write(`Updating the message: ${req.params.messageId}\n`);
    res.end(`Will update the message: ${req.body.name} 
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting message: ${req.params.messageId}`);
});

module.exports = messageRouter;