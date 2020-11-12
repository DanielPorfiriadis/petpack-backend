const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    creator: {
        type: String,
    },
    timestamp: {
        type: Date,
    },
    postId: {
        type: String,
    }
});
module.exports = mongoose.model('Comment', commentSchema);