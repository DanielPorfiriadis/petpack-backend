const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    UserName: {
        type: String,
    },
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    Password: {
        type: String,
    },
    Email: {
        type: String,
    },
    BirthDate: {
        type: Date,//date format: YYYY-MM-DD
    },

});
module.exports = mongoose.model('UserData', userDataSchema);