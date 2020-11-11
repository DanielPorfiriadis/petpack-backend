const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// //const jwt = require('jsonwebtoken');


// const userDataSchema = new mongoose.Schema({
//     userName: {
//         type: String,
//     },
//     firstName: {
//         type: String,
//     },
//     lastName: {
//         type: String,
//     },
//     password: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     birthDate: {
//         type: Date,//In order to insert correct date format enter: YYYY-MM-DD
//     },

//     accessToken: {
//         type: String,
//     },

// });

// userDataSchema.methods.setPassword = function (password) {
//     const salt = bcrypt.genSaltSync(12);//set encryption strength
//     const hash = bcrypt.hashSync(password, salt);//encrypt password
//     this.password = hash;
// };

// /*userDataSchema.methods.generateJWT = function () {

//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(today.getDate() + 60);

//     return jwt.sign({
//         email: this.email,
//         id: this._id,
//         exp: parseInt(expirationDate.getTime() / 1000, 10),
//     }, 'secret');
// };*/

// module.exports = mongoose.model('UserData', userDataSchema);