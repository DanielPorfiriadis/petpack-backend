const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comments");



const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization");

     res.setHeader("Access-Control-Allow-Methods", 
      "GET, POST, PATCH, PUT, DELETE, OPTIONS");

    next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join("backend/images")));

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;