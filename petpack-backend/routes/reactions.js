const express = require('express')
const router = express.Router();
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");

const Reaction = require('../models/reaction');
const { update } = require('../models/reaction');

var reactionDeleted = false;


/*const emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];*/

// Ektelesi Nayas
// -----------------------------------


router.post("", (req, res, next) => {
    const query = {
        userId: req.body.userId,
        postId: req.query.postId
    };

    const emote = {
        emote: req.body.emote
    };


    Reaction.findOneAndUpdate(query, emote, { new: true, upsert: true }, function (err, fetchedReactions) { console.log(fetchedReactions); });
   
});

router.delete("", (req, res, next) => {
    const deletedItems = {
        userId: req.body.userId,
        postId: req.query.postId,
        emote: req.body.emote
    };
    Reaction.findOneAndDelete(deletedItems, function (err, fetchedReactions) { console.log(fetchedReactions) });

});

router.get("", (req, res, next) => {
    const allEmotes = {
        postId: req.query.postId,
        emote: req.body.emote
    };
    Reaction.find(allEmotes, function (err, fetchedReactions) { console.log(fetchedReactions) });
}
    )

    


module.exports = router;




/*
const deletedItems = {
    userId: req.body.userId,
    postId: req.query.postId,
    emote: req.body.emote
}
Reaction.findOneAndDelete(deletedItems, function (err, fetchedReactions) {
    console.log(err);
    if (null) {

        return true;
        console.log("1");
    };
    return false;

}).then(reaction => {
    console.log(reaction);
    if (reaction == false) {
        const query = {
            userId: req.body.userId,
            postId: req.query.postId
        };

        const emote = {
            emote: req.body.emote
        };
        Reaction.findOneAndUpdate(query, emote, { new: true, upsert: true }, function (err, fetchedReactions) { console.log(fetchedReactions); });
    }
});*/







/*    const userId = req.body.userId;
    const emote = req.body.emote;
    const postId = req.params.postId;
    */
/*
    const reaction = new Reaction({

        userId: userId,
        emote: emote,
        postId: postId,
       

    });

*/
/* ({ item: "Banana", stock: { $gt: 5 } })*/


/* $and: [
     { From: { $gte: DateFrom } },
     { To: { $lte: DateTo } },
 ]
*/

/* Reaction.find({  postId: req.params.postId }, function (err, fetchedReactions) { console.log(fetchedReactions); }
 );*/


    //-------------------------------
    //       XAMENOS KOPOS
    //------------------------------


/* const reaction = {
     userId: req.body.userId,
     postId: req.query.postId,
     emote: req.body.emote
 };

 const query = {
     userId: req.body.userId,
     postId: req.query.postId
 };

 const emote = {
     emote: req.body.emote
 };

 Reaction.find({
     $and: [
         { userId: req.body.userId },
         { postId: req.query.postId },
         { emote: req.body.postId }]
 }, function (err, fetchedReaction) {
     if (fetchedReaction) {
         this.findOneAndDelete(fetchedReaction);
         console.log("5");
     } else {
         console.log("2");
         this.findOneAndUpdate(fetchedReaction, emote, { new: true, upsert: true }, function (err, fetchedReactions) { console.log(fetchedReactions); });
     }
 });
});
*/


















    //-------------------------------------------------------------
/*   Reaction.find({
       $and: [
           { userId: req.body.userId },
           { postId: req.params.postId }]
   }.save()
   );*/


    //----------------------------------------------------------------------------

/*
 console.log(reaction);*/

/*
    console.log(req.body.emote);
    console.log(req.body.userId);
    console.log(req.params.postId);
*/


/* reaction.save().then(emoji => {
     *//*here we return the respons*//*res.status(201).json(*//*we create a json which has a message part and a post par*//*{
  
    message: 'Somebody toucha my spaghet!',
    reaction: {
        emote: emoji.emote,
        id: emoji._id
       
    }
});

});*/













// Official ektelesi
// ---------------------------

/*
router.post("/:postId", (req, res, next) => {

    const userId = req.body.userId;
    const emote = req.params.emote;
    const postId = req.params.postId;

    const reaction = new Reaction({
        userId: userId,
        emote: emote,
        postId: postId
    });
    console.log(reaction);
    reaction.save().then(response => {
        res.status(201).json({
            message: response
        });
    });
});
*/



/*

router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find().sort({ timeStamp: -1 });
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Post.countDocuments();
        }).then(count => {
            res.status(200).json({
                message: 'Posts fetched succesfully',
                posts: fetchedPosts,
                maxPosts: count
            });
        });
});

router.get("/users", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const username = req.query.username;
    const postQuery = Post.find({ creatorUsername: username }).sort({ timeStamp: -1 });
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Post.countDocuments();
        }).then(count => {
            res.status(200).json({
                message: 'Posts fetched succesfully',
                posts: fetchedPosts,
                maxPosts: count
            });
        });
})


router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(results => {
        if (results.n > 0) {
            res.status(200).json({ message: "Deletion successful" });
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    });*/