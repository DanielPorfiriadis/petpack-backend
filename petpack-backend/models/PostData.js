const mongoose = require('mongoose');

const postDataSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    userID: {
        type: String,
    },
    timeStamp: {
        type: Date,
    },

});
module.exports = mongoose.model('PostData', postDataSchema);