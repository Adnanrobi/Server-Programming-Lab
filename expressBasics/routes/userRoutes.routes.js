const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json);

router.get('/login', (req, res) => {
    const { id, username } = req.query;
    res.send('user with ID  ${id} and ${username} is requesting to login');
});

router.get('/dashboard/:id/', (req, res) => {
    const id = req.params.id;
    res.send('user with ID  ${id} and ${username} is requesting to access the dashboard')
})

router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './views/users' });
});

router.get('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    //res.sendFile('register.html', { root: './views/users' });
    res.send(
        'user with email = ${email} and username = ${username} is requesting to register'
    )
});

    module.exports = router;