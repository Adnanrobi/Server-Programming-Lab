require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

//Connect to DB:
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Database!")
}).catch((error) => {
    console.log("Error");
})

//static resources:
app.use(express.static("public"));

//View Engine:
app.set("View Engine", "ejs");

//Session and Flash:
app.use(session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

//body_Parser :
app.use(express.urlencoded({extended: false }));

//Routes:
const indexRoutes = require('./routes/index.routes');
const userRoutes = require('./routes/users.routes')
app.use(indexRoutes);
app.use("/users", userRoutes);

module.exports = app;
