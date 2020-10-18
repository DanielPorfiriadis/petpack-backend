//This class is going to have all the endpoints needed for the User's information
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const UserData = mongoose.model('UserData');

router.post('/register/user', (req, res) => {
    const userData = new UserData();
    //check if user credentials are already in database
    //TODO: We have to check if user's email exist in database
    UserData.exists({ name: req.body.userName }, function (err, exists) {
        if (exists == false) {
            userData.userName = req.body.userName;
            userData.firstName = req.body.firstName;
            userData.lastName = req.body.fastName;
            var password = req.body.password;
            const salt = bcrypt.genSaltSync(12);//set encryption strength
            const hash = bcrypt.hashSync(password, salt);//encrypt password
            userData.password = hash;
            userData.email = req.body.email;
            userData.birthDate = req.body.birthDate;
            userData.save().then(() => { res.redirect('/'); });
        }
        else {
            //TODO: Send appropiate respond message 
            res.send('user exists already');
            console.log("User already exists");
        }
    });

})

/*
//We will need this function later in order to retrieve data in front end
app.get('/find/user', function (req, res) {
    const userData = new UserData();

    UserData.find({ userName: req.body.userName }, function (err, userData) {

        res.send(userData);
    }); 
})
*/

module.exports = router;