const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller')

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);
router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;