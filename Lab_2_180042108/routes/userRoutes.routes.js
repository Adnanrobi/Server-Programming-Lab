const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.controller');
const isLoggedIn = require('../middlewares/auth.middleware');

router.get('/',userController.getLandingPage);
router.get('/login', userController.getLoginPage);
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/dashboard', isLoggedIn.isLoggedIn, userController.getDashboard);

module.exports = router;