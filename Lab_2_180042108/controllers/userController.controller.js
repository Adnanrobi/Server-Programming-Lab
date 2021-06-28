const user = require('../models/userModel.model');

const getLandingPage = (req, res) => {
    res.sendFile('index3.html', { root: './views' });
};
const getLoginPage = (req, res) => {
    res.sendFile('login.html', { root: './views/pages/examples' });
};
const getRegisterPage = (req, res) => {
    res.sendFile('register.html', { root: './views/pages/examples' });
};

const postRegister = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const retype = req.body.retype;

    if (password.length < 6 || !name || !email) { return res.json({ message: 'Invalid Registration' }) }
    
    res.json({ message: 'registration successful' })
        
};

module.exports = {
    getLandingPage,
    getLoginPage,
    getRegisterPage,
    postRegister
};