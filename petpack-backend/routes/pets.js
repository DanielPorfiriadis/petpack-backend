//This class is going to have all the endpoints needed for the Pet's information
const express = require('express');

const router = express.Router();
var petController = require('../controllers/pet');

//create Pet in database // /owner/:ownerId
router.post('/register/pet/:ownerId', petController.add_pet);

module.exports = router;