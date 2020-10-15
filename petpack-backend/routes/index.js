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
    userData.UserName = req.body.UserName;
    userData.FirstName = req.body.FirstName;
    userData.LastName = req.body.LastName;
    userData.Password = req.body.Password;
    userData.Email = req.body.Email;
    userData.BirthDate = req.body.BirthDate;
    petData.petName = req.body.petName;
    petData.petOwner = userData.id;
    petData.petSex = req.body.petSex;
    petData.petSpecies = req.body.petSpecies;
    petData.save();
    userData.save().then(() => { res.redirect('/'); });

    
})

module.exports = router;