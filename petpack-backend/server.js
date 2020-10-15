require('dotenv').config();
require('./models/UserData');
require('./models/PetData');


const mongoose = require('mongoose');

const app = require('./app');


const server = app.listen(1337, () => {
    console.log(`Express is running on port ${server.address().port}`);
});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose Connected');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });