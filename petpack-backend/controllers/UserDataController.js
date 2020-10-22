const mongoose = require('mongoose');
const UserData = mongoose.model('UserData');
const bcrypt = require('bcrypt');

exports.login_user = function (req, res) {
    const givenUsername = req.body.userName;
    const givenPassword = req.body.password;

    //Retrieve User data from database
    UserData.findOne({ userName: givenUsername }, function (err, userData) { });
    if (err) {
        //TODO: Here we need to implement appropiate error respond
        res.send("login error");
    }
    if (!userData) {
        //TODO: Here we need to implement appropiate error respond
        res.send("incorrect username!");
    }
    //check if the hashed password if same with given password
    bcrypt.compare(givenPassword, userData.password, function (err, isMatch) {
        if (err) {
            //TODO: Here we need to implement appropiate error respond
            res.send("login error");
        } else if (!isMatch) {
            //TODO: Here we need to implement appropiate error respond
            res.send("Password doesn't match!");
        } else {
            //TODO: Here we need to implement appropiate error respond
            res.send("Password matches!");
        }
    });
}

exports.register_user = function (req, res) {
    const userData = new UserData();
    //check if user credentials are already in database
    //TODO: We have to check if user's email exist in database
    UserData.exists({ name: req.body.userName }, function (err, exists) {
        if (exists == false) {
            userData.userName = req.body.userName;
            userData.firstName = req.body.firstName;
            userData.lastName = req.body.lastName;
            var password = req.body.password;
            const salt = bcrypt.genSaltSync(12);//set encryption strength
            const hash = bcrypt.hashSync(password, salt);//encrypt password
            userData.password = hash;
            userData.email = req.body.email;
            userData.birthDate = req.body.birthDate;
            userData.save().then(() => { res.redirect('/'); });
        }
        else {
            //TODO: Send appropiate respond message 
            res.send('user exists already');
            console.log("User already exists");
        }
    });
}

/*
//We will need this function later in order to retrieve data in front end
app.get('/find/user', function (req, res) {
    const userData = new UserData();

    UserData.find({ userName: req.body.userName }, function (err, userData) {

        res.send(userData);
    });
})
*/