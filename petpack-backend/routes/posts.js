const express = require('express')
const router = express.Router();
const multer = require('multer');
const checkAuth =require("../middleware/check-auth");

const Post = require('../models/post');

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

router.post("", checkAuth,multer({storage: storage}).single("image"),/*den xreiazete*/(req, res, next) => {
   /*den xreiazete*/ const url = req.protocol + '://' + req.get("host");
    const post = new Post({// dimiourgoume to adikeimeno pou theloume na apothikefsoume
        //timeStamp: Date.now,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId,
        creatorUsername: req.userData.userName,
    });
    post.save()./*me to then eketeloyme entoli  molis ginei i proigoumeni energia stin prokimeni .save()*/then(/*created Post einai i timi pou epistrefei to save*/createdPost =>{
        /*here we return the respons*/res.status(201).json(/*we create a json which has a message part and a post par*/{
            message: 'Post added successfuly!',
            post: {
                ...createdPost,/*with the 3 dots we ensure that the value is transfered correctly*/
                id: createdPost._id
            }
        });
    });
});

router.put("/:id", checkAuth,
    multer({storage: storage}).single("image"), 
    (req, res, next) => {
        let imagePath = req.body.imagePath;
        /*den xreiazete*/if(req.file) {
            const url = req.protocol + '://' + req.get("host");
            imagePath = url + "/images/" + req.file.filename
        }/*den xreiazete*/
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath,
            creator: req.userData.userId,
            creatorUsername: req.userData.userName
        });
        
        Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post).then(result => {
            if (result.nModified>0){
                res.status(200).json({message: "Update successful"});
            } else {
                res.status(401).json({message: "Not authorized"});
            }

    });
})

router.get("", (req, res, next )=> {
    /*den xreiazete*/const pageSize = +req.query.pagesize;
    /*den xreiazete*/const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    /*den xreiazete*/if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
        .then(documents =>{
            fetchedPosts =documents;
            return Post.countDocuments();
        }).then(count => { 
            res.status(200).json({
                message: 'Posts fetched succesfully',
                posts: fetchedPosts,
                maxPosts: count
        });
    });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
             res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found'});
        }
    });
});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(results => {

        if (result.n >0){
            res.status(200).json({message: "Deletion successful"});
        } else {
            res.status(401).json({message: "Not authorized"});
        }
    });
});

module.exports = router;