const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    userId: { type: String },
    postId: { type: String },
    emote: { type: String }
});
/*reactionSchema.statics.getEmotes = function(emote,userId,postId) {
    return Reaction.findandModify({
        query: {
            userId: { userId }, postId: { postId }
        },

    });
}*/

module.exports = mongoose.model('Reaction', reactionSchema);

/*module.exports.getEmotes;*/