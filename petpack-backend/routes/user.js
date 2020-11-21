const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const checkAuth =require("../middleware/check-auth");

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

router.put("/update/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next)=> {
    let imagePath = req.body.imagePath;
    let user = new User();
    console.log(req.body);
    if(req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    if(req.body.password!='null'){
        bcrypt.hash(req.body.password, 10).then(hash => {
                   user = {
                    _id: req.params.id,
                    email: req.body.email,
                    password: hash,
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    userName: req.body.userName,
                    };
                    User.updateOne({_id: req.params.id}, user).then(result => {
                        if (result.nModified>0){
                            res.status(200).json({message: "Update successful", status:'200'});
                        } else {
                            res.status(401).json({message: "Not authorized", status: '401'});
                        }
                    });
                });
    }
        else{
        console.log('else');
        user = {
            _id: req.params.id,
            email: req.body.email,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            userName: req.body.userName,
            imagePath: imagePath
            };
        User.updateOne({_id: req.params.id}, user).then(result => {
            if (result.nModified>0){
                res.status(200).json({message: "Update successful", status:'200'});
            } else {
                res.status(401).json({message: "Not authorized", status: '401'});
            }
        });
    }
    // if(!req.file) {
    //     console.log('1o if');
    //     console.log('ok');
    //     const url = req.protocol + '://' + req.get("host");
    //     imagePath = url + "/images/" + req.file.filename;
    //     user ={imagePath: imagePath};
    // }

    // if(!req.body.password){
    //     console.log('2o if');
    //     bcrypt.hash(req.body.password, 10).then(hash => {
    //        user = {
    //         _id: req.params.id,
    //         email: req.body.email,
    //         password: hash,
    //         lastName: req.body.lastName,
    //         firstName: req.body.firstName,
    //         userName: req.body.userName,
    //         };
    //         User.updateOne({_id: req.params.id}, user).then(result => {
    //             if (result.nModified>0){
    //                 res.status(200).json({message: "Update successful", status:'200'});
    //             } else {
    //                 res.status(401).json({message: "Not authorized", status: '401'});
    //             }
    //         });
    //     });
    // }
    // else{
    //     console.log('else');
    //     user = {
    //         _id: req.params.id,
    //         email: req.body.email,
    //         lastName: req.body.lastName,
    //         firstName: req.body.firstName,
    //         userName: req.body.userName,
    //         };
    //     User.updateOne({_id: req.params.id}, user).then(result => {
    //         if (result.nModified>0){
    //             res.status(200).json({message: "Update successful", status:'200'});
    //         } else {
    //             res.status(401).json({message: "Not authorized", status: '401'});
    //         }
    //     });
    // }
});

router.post("/signup", multer({storage: storage}).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            imagePath: imagePath
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