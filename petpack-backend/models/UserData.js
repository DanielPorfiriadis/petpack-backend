const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    birthDate: {
        type: Date,//In order to insert correct date format enter: YYYY-MM-DD
    },

});
module.exports = mongoose.model('UserData', userDataSchema);