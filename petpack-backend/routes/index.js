const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const UserData = mongoose.model('UserData');




router.get('/', (req, res) => {
    res.send('test  slash ok');
});

router.get('/register', (req, res) => {
    res.send('test register ok');
});


router.post('/register', (req, res) => {
    const userData = new UserData(req.body);
    userData.save().then(() => { res.redirect('/'); });

})

module.exports = router;