const mongoose = require('mongoose');
const PetData = mongoose.model('PetData');

exports.add_pet = function (req, res, next) {
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
    
}