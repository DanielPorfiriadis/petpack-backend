const mongoose = require('mongoose');

const petDataSchema = new mongoose.Schema({
    petName: {
        type: String,
    },
    ownerUsername: {
        type: String,
    },
    gender: {
        type: String,
    },
    species: {
        type: String,
    },
    petAvatar: {
        type: String
    }
});

module.exports = mongoose.model('PetData', petDataSchema);