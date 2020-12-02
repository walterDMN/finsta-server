const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    friendName: {
        type: String,
        required: true
    },
    sentMessage: {
        type: String,
        required: true
    },
    receivedMessage: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    },
    friendImage: {
        type: String,
        required: true
    }
}, {
    timestamp: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;