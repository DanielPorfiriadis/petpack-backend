const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const UserData = mongoose.model('UserData');
const PetData = mongoose.model('PetData');

router.get('/', (req, res) => {
    res.send('test  slash ok');
});

router.get('/register', (req, res) => {
    res.send('test register ok');
});

router.post('/register', (req, res) => {
    const userData = new UserData();
    const petData = new PetData();
    userData.name = req.body.name;
    userData.email = req.body.email;
    petData.petName = req.body.pet_name;
    petData.petOwner = userData.id;
    petData.save();
    userData.save().then(() => { res.redirect('/'); });
})

module.exports = router;