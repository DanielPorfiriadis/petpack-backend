const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
});
module.exports = mongoose.model('UserData', userDataSchema);