const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const UserData = mongoose.model('UserData');
const PetData = mongoose.model('PetData');
const BCRYPT_SALT_ROUNDS = 4;
router.get('/', (req, res) => {
    res.send('test  slash ok');
});

router.get('/register', (req, res) => {
    res.send('test register ok');
});

router.post('/register', (req, res) => {
    const userData = new UserData();

    /*    const tempData = new UserData();
        tempData = UserData.find({
            userName: req.body.userName
        }).catch();*/

    UserData.exists({ name: req.body.userName }, function (err, doc) {
        if (doc==false) {
            const petData = new PetData();
            userData.userName = req.body.userName;
            userData.firstName = req.body.firstName;
            userData.lastName = req.body.fastName;

            password = req.body.password;
            const salt = bcrypt.genSaltSync(4);
            const hash = bcrypt.hashSync(password, salt);
            userData.password = hash;
            userData.email = req.body.email;
            userData.birthDate = req.body.birthDate;
            petData.petName = req.body.petName;
            petData.petOwner = userData.id;
            petData.petSex = req.body.petSex;
            petData.petSpecies = req.body.petSpecies;
            petData.save();
            userData.save().then(() => { res.redirect('/'); });
        }
        else {
            res.send('user exists already');
            console.log("User already exists");
        }
    });








})

module.exports = router;