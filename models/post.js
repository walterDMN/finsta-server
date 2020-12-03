const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    }
}, {
    timestamps: true
});

const postSchema = new Schema({
    author: {
        type: String,
        required: true,
        unique: true
    },
    caption: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;