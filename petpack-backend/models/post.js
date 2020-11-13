const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    //timeStamp: { type: Date },
    content: { type: String, required: true },
    imagePath: {type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true},
    creatorUsername: { type: String, required: true }
});

module.exports = mongoose.model('Post',postSchema);