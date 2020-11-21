const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    userId: { type: String },
    postId: { type: String },
    emote: { type: String }
});


module.exports = mongoose.model('Reaction', reactionSchema);

