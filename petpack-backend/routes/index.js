const express = require('express');

const router = express.Router();

//We need it in order to open application properly
router.get('/', (req, res) => {
    res.send('test  slash ok');
});

module.exports = router;