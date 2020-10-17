const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const UserData = mongoose.model('UserData');
const PetData = mongoose.model('PetData');

router.get('/', (req, res) => {
    res.send('test  slash ok');
});

/*router.get('/register', (req, res) => {
    res.send('test register ok');
});*/



module.exports = router;

/*router.post('/register', (req, res) => {
    const userData = new UserData();

    *//*    const tempData = new UserData();
        tempData = UserData.find({
            userName: req.body.userName
        }).catch();*//*

    UserData.exists({ name: req.body.userName }, function (err, doc) {
        if (doc==false) {
            const petData = new PetData();
            userData.userName = req.body.userName;
            userData.firstName = req.body.firstName;
            userData.lastName = req.body.fastName;
            userData.password = req.body.password;
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
    });*/
/*







})
*/
