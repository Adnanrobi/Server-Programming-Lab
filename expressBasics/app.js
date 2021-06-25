const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes.routes')

app.use(userRoutes);
app.get('/', (req, res) => {
    //res.send("<H1>HOME PAGE - POST REQUEST</H1>");
    res.sendFile('home.html', {root: './views'});
});

app.get('/about', (req, res) => {
    res.send("<H1>ABOUT PAGE</H1>")
});

app.get('/contact', (req, res) => {
    res.send("<H1>CONTACT PAGE</H1>")
});

app.use((req, res) => {
    res.status(401).send("<h1>page doesn't exist!</h1>");
})
module.exports = app;