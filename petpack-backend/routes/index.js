const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const UserData = mongoose.model('UserData');
const PetData = mongoose.model('PetData');



router.get('/', (req, res) => {
    res.send('test  slash ok');
});



router.post('/login', (req, res) => {

    const givenUsername = req.body.userName;
    const givenPassword = req.body.password;
    
    UserData.findOne({ userName: givenUsername }, function (err, userData) {
        
        });                  
    if (err) {
        
        res.send("login error");
    }
    if (!userData) {
        
        res.send("incorrect username!");
    }
    bcrypt.compare(givenPassword, userData.password, function (err, isMatch) {
        if (err) {
            
            res.send("login error");
        } else if (!isMatch) {
            
            res.send("Password doesn't match!");
        } else {
            
            res.send("Password matches!");
        }
                
        
    });
        
});

module.exports = router;

