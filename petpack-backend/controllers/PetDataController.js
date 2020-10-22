const mongoose = require('mongoose');
const PetData = mongoose.model('PetData');

exports.add_pet = function (req, res) {
    const petData = new PetData();
    petData.petName = req.body.petName;
    petData.petOwner = req.params.ownerId;
    petData.petSex = req.body.petSex;
    petData.petSpecies = req.body.petSpecies;
    petData.save().then(() => { res.redirect('/'); });
}