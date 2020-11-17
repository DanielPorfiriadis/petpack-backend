const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const User = require("../models/user");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid){
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name+ '-' + Date.now() + '.' + ext);
    }
});

router.get("/:id", (req, res, next)=> {
    User.findById(req.params.id).then(user=>{
        if (user) {
            res.status(200).json(user);
       } else {
           res.status(404).json({ message: 'User not found'});
       }
    });
});


router.get("", (req, res, next) => {
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


router.post("/signup", multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    console.log(req.file.filename);
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            imagePath: url + "/images/" + req.file.filename,
            password: hash
        });
        user.save().then( result =>{
            res.status(201).json({
                message: 'User created',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
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