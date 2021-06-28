const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.routes');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(userRoutes);

app.use((req, res) => {
    res.sendFile('404.html', { root: './views/pages/Examples'});
  });

module.exports = app;