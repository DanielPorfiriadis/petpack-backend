//This class is going to have all the endpoints needed for the Pet's information
const express = require('express');
const Pet = require('../models/pet');
const router = express.Router();
const multer = require('multer');
var petController = require('../controllers/pet');
const checkAuth =require("../middleware/check-auth");

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

//create Pet in database // /owner/:ownerId
router.post('/add/:ownerUsername', multer({storage: storage}).single("image"),(req, res, next) => {
    var imagePathString ='';
    if(req.file!=null){
        const url = req.protocol + '://' + req.get("host");
        imagePathString = url + "/images/" + req.file.filename
    }
    const pet = new Pet({
        petName: req.body.petName,
        gender: req.body.gender,
        species: req.body.species,
        ownerUsername: req.params.ownerUsername,
        petAvatar: imagePathString
    });
    console.log(pet);
    pet.save().then(result =>{
        res.status(201).json({
            message: 'Pet saved',
            result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            err:err
        });
    });
    
});

router.put('/update', checkAuth, multer({storage: storage}).single("petAvatar"),(req, res, next) => {
    var imagePathString = req.body.petImagePreview;
    if(req.file!=null){
        const url = req.protocol + '://' + req.get("host");
        imagePathString = url + "/images/" + req.file.filename;
    }
    const pet = new Pet ({
        _id: req.body._id,
        petName: req.body.petName,
        species: req.body.species,
        gender: req.body.gender,
        ownerUsername: req.body.ownerUsername,
        petAvatar: imagePathString
    });
    console.log(pet);
    Pet.updateOne({_id: req.body._id}, pet).then(result => {
        console.log(result);
        if (result.nModified>0){
            res.status(200).json({message: "Update successful", status:'200'});
        } else {
            res.status(401).json({message: "Not authorized", status: '401'});
        }
    });
})

router.get('/get/:ownerUsername', (req, res, next) => {
    let fetchedPets
    Pet.find({ownerUsername: req.params.ownerUsername})
        .then(documents =>{
            fetchedPets= documents;
            return Pet.countDocuments();
        }).then(count =>{
            res.status(200).json({
                message: 'Pets fetched successfully',
                pets: fetchedPets,
                petsCount: count
            })
        })
})

module.exports = router;