const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const UserData = mongoose.model('UserData');

router.post('/register/user', (req, res) => {
    const userData = new UserData();

    UserData.exists({ name: req.body.userName }, function (err, doc) {
        if (doc == false) {
            userData.userName = req.body.userName;
            userData.firstName = req.body.firstName;
            userData.lastName = req.body.fastName;
            var password = req.body.password;
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);
            userData.password = hash;
            userData.email = req.body.email;
            userData.birthDate = req.body.birthDate;
            userData.save().then(() => { res.redirect('/'); });
        }
        else {
            res.send('user exists already');
            console.log("User already exists");
        }
    });

})

module.exports = router;