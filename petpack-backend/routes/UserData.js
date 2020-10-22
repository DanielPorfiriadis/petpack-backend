//This class is going to have all the endpoints needed for the User's information
const express = require('express');

const router = express.Router();
var userController = require('../controllers/UserDataController');

router.post('/register/user', userController.register_user);

//Login Endpoint
router.post('/login', (req, res), userController.login_user);

module.exports = router;