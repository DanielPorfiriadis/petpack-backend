const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    timeStamp: { type: String },
    content: { type: String, required: true },
    imagePath: {type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true},
    creatorUsername: { type: String, required: true },
    postAvatar: {type: String}
});

module.exports = mongoose.model('Post',postSchema);