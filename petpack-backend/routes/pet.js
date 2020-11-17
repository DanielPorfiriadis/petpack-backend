//This class is going to have all the endpoints needed for the Pet's information
const express = require('express');
const Pet = require('../models/pet');
const router = express.Router();
var petController = require('../controllers/pet');

//create Pet in database // /owner/:ownerId
router.post('/add/:ownerUsername',(req, res, next) => {
    const pet = new Pet({
        petName: req.body.petName,
        gender: req.body.gender,
        species: req.body.species,
        ownerUsername: req.params.ownerUsername,
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