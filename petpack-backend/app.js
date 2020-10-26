const express = require('express');
const routesIndex = require('./routes/index');
const routesUserData = require('./routes/UserData');
const routesPetData = require('./routes/PetData');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }));
//Below are the route classes we want to run
app.use('/', routesIndex);
app.use('/', routesUserData);
app.use('/', routesPetData);


module.exports = app;