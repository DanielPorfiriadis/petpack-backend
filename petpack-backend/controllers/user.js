const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { request } = require('../app');

exports.login_user = function (req, res) {


    const givenUsername = req.body.userName;
    const givenPassword = req.body.password;
    const secret = 'swsh23hjddnns';
    //Retrieve User data from database
    User.findOne({ userName: givenUsername }, function (err, userData) { 
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
                        userName: userData.userName,
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
