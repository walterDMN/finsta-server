const express = require('express');
const postRouter = express.Router();

postRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the posts to you');
})
.post((req, res) => {
    res.end(`Will add the post: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /posts');
})
.delete((req, res) => {
    res.end('Deleting all posts');
});

postRouter.route('/:postId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the post: ${req.params.postId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /posts/${req.params.postId}`);
})
.put((req, res) => {
    res.write(`Updating the post: ${req.params.postId}\n`);
    res.end(`Will update the post: ${req.body.name} 
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting post: ${req.params.postId}`);
});

module.exports = postRouter;