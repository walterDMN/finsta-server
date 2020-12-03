const express = require('express');
const Post = require ('../models/post');

const postRouter = express.Router();

postRouter.route('/')
.get((req, res) => {
    Post.find()
    .then(posts => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(posts);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    Post.create(req.body)
    .then(post => {
        console.log('Post Created ', post);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /posts');
})
.delete((req, res) => {
    Post.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

postRouter.route('/:postId')
.get((req, res) => {
    Post.findById(req.params.postId)
    .then(post => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /posts/${req.params.postId}`);
})
.put((req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        $set: req.body
    }, { new: true })
    .then(post => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    })
    .catch(err => next(err));
})
.delete((req, res) => {
    Post.findByIdAndDelete(req.params.postId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

postRouter.route('/:postId/comments')
.get((req, res, next) => {
    Post.findById(req.params.postId)
    .then(post => {
        if (post) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(post.comments);
        } else {
            err = new Error(`Post ${req.params.postId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Post.findById(req.params.postId)
    .then(post => {
        if (post) {
            campsite.comments.push(req.body);
            post.save()
            .then(post => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Post ${req.params.postId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /posts/${req.params.postId}/comments`);
})
.delete((req, res, next) => {
    Post.findById(req.params.postId)
    .then(post => {
        if (post) {
            for (let i = (post.comments.length-1); i >= 0; i--) {
                post.comments.id(post.comments[i]._id).remove();
            }
            post.save()
            .then(post => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});


postRouter.route('/:postId/comments/:commentId')
.get((req, res, next) => {
    Post.findById(req.params.postId)
    .then(post => {
        if (post && post.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(post.comments.id(req.params.commentId));
        } else if (!post) {
            err = new Error(`Post ${req.params.postId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /posts/${req.params.postId}/comments/${req.params.commentId}`);
})
.put((req, res, next) => {
    Post.findById(req.params.postId)
    .then(post => {
        if (post && post.comments.id(req.params.commentId)) {
            if (req.body.rating) {
                post.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.text) {
                post.comments.id(req.params.commentId).text = req.body.text;
            }
            post.save()
            .then(post => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            })
            .catch(err => next(err));
        } else if (!campsite) {
            err = new Error(`Post ${req.params.postId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Post.findById(req.params.postId)
    .then(post => {
        if (post && post.comments.id(req.params.commentId)) {
            post.comments.id(req.params.commentId).remove();
            post.save()
            .then(post => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(post);
            })
            .catch(err => next(err));
        } else if (!post) {
            err = new Error(`post ${req.params.postId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

module.exports = postRouter;