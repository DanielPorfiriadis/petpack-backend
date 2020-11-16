//This class is going to have all the endpoints needed for the Pet's information
const express = require('express');
const Pet = require('../models/pet');
const router = express.Router();
var petController = require('../controllers/pet');

//create Pet in database // /owner/:ownerId
router.post('/add/:ownerUsername', petController.add_pet());

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