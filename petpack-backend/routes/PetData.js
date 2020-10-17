const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const PetData = mongoose.model('PetData');

router.post('/register/pet/:ownerId', (req, res) => {
    const petData = new PetData();
    petData.petName = req.body.petName;
    petData.petOwner = req.params.ownerId;
    petData.petSex = req.body.petSex;
    petData.petSpecies = req.body.petSpecies;
    petData.save().then(() => { res.redirect('/'); });;
})

module.exports = router;