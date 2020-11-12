const express = require('express')
const router = express.Router();
const checkAuth =require("../middleware/check-auth");

const Comment = require('../models/comment');


router.post("",(req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const comment = new Comment,({
        //timeStamp: Date.now,
        content: req.body.content,
        postId: req.body.postId,
        creator: req.userData.userId
    });
    post.save().then(createdComment =>{
        res.status(201).json({
            message: 'Comment added successfuly!',
            post: {
                ...createdComment,
                id: createdComment._id
            }
        });
    });
});

router.put("/:id",
    multer({storage: storage}).single("image"), 
    (req, res, next) => {
        let imagePath = req.body.imagePath;
        if(req.file) {
            const url = req.protocol + '://' + req.get("host");
            imagePath = url + "/images/" + req.file.filename
        }
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath,
            creator: req.userData.userId
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
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
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