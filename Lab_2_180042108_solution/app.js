const express = require('express');
const app = express();

//static resources:
app.use(express.static("public"));

//View Engine:
app.set("View Engine", "ejs");

//body_Parser :
app.use(express.urlencoded({extended: false }));

//Routes:
const indexRoutes = require('./routes/index.routes');
const userRoutes = require('./routes/users.routes')
app.use(indexRoutes);
app.use("/users", userRoutes);

module.exports = app;
