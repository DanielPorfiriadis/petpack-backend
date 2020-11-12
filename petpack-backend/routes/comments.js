const express = require('express')
const router = express.Router();
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");

const Comment = require('../models/comment');


router.post("",(req, res, next) => {
  
    const comment = new Comment({// dimiourgoume to adikeimeno pou theloume na apothikefsoume
        //timeStamp: Date.now,
        content: req.body.content,
        creator: req.userData.userId,
        postId: req.body.postId

    });
    comment.save()./*me to then eketeloyme entoli  molis ginei i proigoumeni energia stin prokimeni .save()*/then(/*created Post einai i timi pou epistrefei to save*/createdComment => {
        /*here we return the respons*/res.status(201).json(/*we create a json which has a message part and a post par*/{
        message: 'Post added successfuly!',
        comment: {
            ...createdComment,/*with the 3 dots we ensure that the value is transfered correctly*/
            id: createdComment._id
        }
    });
    });
});

router.put("/:id", (req, res, next) => {

        const comment = new Comment({
            _id: req.body.id,
            /*title: req.body.title,*/
            content: req.body.content,
            creator: req.userData.userId
        });

        Comment.updateOne(/*with update one we need to enter one identifier in this case _id*/{ _id: req.params.id, creator: req.userData.userId }, comment).then(result => {
            if (result.nModified > 0/*nModified is the counter of changes that were created with the updateOne method*/) {
                res.status(200).json({ message: "Update successful" });
            } else {
                res.status(401).json({ message: "Not authorized" });
            }

        });
    })

router.get("", (req, res, next) => {
   
    const commentQuery = Comment.find();
    let fetchedComments;
   
    commentQuery
        .then(documents => {
            fetchedPosts = documents;
            return Comment.countDocuments();
        }).then(count => {
            res.status(200).json({
                message: 'Comments fetched succesfully',
                comments: fetchedComments,
                maxComments: count
            });
        });
});

// Tha apofasisoume meta!!!! :D 


router.delete("/:id", (req, res, next) => {
    Comment.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(results => {

        if (result.n > 0) {
            res.status(200).json({ message: "Deletion successful" });
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    });
});

module.exports = router;