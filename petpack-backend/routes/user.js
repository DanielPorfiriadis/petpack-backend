const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");

router.get("/retrieve", (req, res, next) => {
    User.find().select('userName').then(fetchedUserNames => {
        console.log(fetchedUserNames);
        let usernameArray =[];
        fetchedUserNames.forEach(element => {
            usernameArray.push(element.userName);
        });
        console.log(usernameArray);
        res.status(201).json({
            message: 'Users fetched',
            usernameArray: usernameArray
        });
    })
    .catch(err => {
        res.status(500).json({
            err: err
        });
    });
})


router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash
        });
        user.save().then( result =>{
            res.status(201).json({
                message: 'User created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser
    User.findOne({userName: req.body.userName})
        .then(user => {
            if (!user){
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser =user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if(!result) {
                return res.status(404).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign({userName: fetchedUser.userName, userId: fetchedUser._id},
                 'ithastobelonger',
                 { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                userName: fetchedUser.userName
            });
        })
        .catch(err => {
            return res.status(404).json({
                message: "Auth failed"
            });
        })
});




module.exports = router;