const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');//password hasher 

const router = express.Router();
const UserData = mongoose.model('UserData');
const PetData = mongoose.model('PetData');


//We need it in order to open application properly
router.get('/', (req, res) => {
    res.send('test  slash ok');
});


//Login Endpoint
router.post('/login', (req, res) => {

    const givenUsername = req.body.userName;
    const givenPassword = req.body.password;

    //Retrieve User data from database
    UserData.findOne({ userName: givenUsername }, function (err, userData) {});                  
    if (err) {
        //TODO: Here we need to implement appropiate error respond
        res.send("login error");
    }
    if (!userData) {
        //TODO: Here we need to implement appropiate error respond
        res.send("incorrect username!");
    }
    //check if the hashed password if same with given password
    bcrypt.compare(givenPassword, userData.password, function (err, isMatch) {
        if (err) {
            //TODO: Here we need to implement appropiate error respond
            res.send("login error");
        } else if (!isMatch) {
            //TODO: Here we need to implement appropiate error respond
            res.send("Password doesn't match!");
        } else {
            //TODO: Here we need to implement appropiate error respond
            res.send("Password matches!");
        }
                
        
    });
        
});

module.exports = router;

