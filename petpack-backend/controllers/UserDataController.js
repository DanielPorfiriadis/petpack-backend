const mongoose = require('mongoose');
const UserData = mongoose.model('UserData');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { request } = require('../app');




exports.login_user = function (req, res) {


    const givenUsername = req.body.userName;
    const givenPassword = req.body.password;
    const secret = 'swsh23hjddnns';
    //Retrieve User data from database
    UserData.findOne({ userName: givenUsername }, function (err, userData) { 
        if (err) {
            //TODO: Here we need to implement appropiate error respond
            res.status(400).send("login error");
        }
        if (!userData) {
            //TODO: Here we need to implement appropiate error respond
            res.status(400).send("incorrect username!");
        }
        else {
            //check if the hashed password if same with given password
            bcrypt.compare(givenPassword, userData.password, function (bcryptErr, isMatch) {
                if (bcryptErr) {
                    //TODO: Here we need to implement appropiate error respond
                    res.status(400).send("login error");
                } else if (!isMatch) {
                    //TODO: Here we need to implement appropiate error respond
                    res.status(400).send("Password doesn't match!");
                } else {
                    //TODO: Here we need to implement appropiate error respond
                    let payload = { userName: givenUsername }

                    let accessToken = jwt.sign(payload, secret, {
                        algorithm: "HS256",
                        expiresIn: 120
                    })
                    const body = {
                        userId: userData.id,
                        jwt: accessToken,
                        status: 200,
                    };
                    userData.accessToken = accessToken;
                    userData.save().then(() => { res.status(200).send(body); });
                   
                }
            });
        }
    });

}

exports.register_user = function (req, res) {
   
    //check if user credentials are already in database
    //TODO: We have to check if user's email exist in database
    UserData.exists({ userName: req.body.userName }, function (err, exists) {
        if (exists == false) {
            const userData = UserData();
            userData.userName = req.body.userName;
            userData.firstName = req.body.firstName;
            userData.lastName = req.body.lastName;
            userData.email = req.body.email;
            userData.birthDate = req.body.birthDate;
            userData.accessToken = '';

            var password = req.body.password;
            userData.setPassword(password);

            userData.save().then(() => { res.status(200).send('done'); });
            
        }
        else {
            //TODO: Send appropiate respond message 
            res.status(400).send('user exists already');
            console.log("User already exists");
        }
    });
}

/*exports.retrieve_user_info = function (req, res) {

    UserData.find({ userName: req.body.userName }, function (err, userData) {

        res.send(userData);
    });


}

exports.change_user_info = function (req, res) {

    UserData.find({ userName: req.body.userName }, function (err, userData)){
        //alter userData attributes
    });
}
*/
