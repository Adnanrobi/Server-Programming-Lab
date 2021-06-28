const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage('./scratch');
const alert = require('alert');

const isLoggedIn = (req, res, next) => {
        const name = localStorage.getItem('name');
        if (name)
        {
            alert(`name: ${name}`);
            next();
        }
        else
        {
            alert('Not Signed in!');
            res.redirect('/login');
        }
}

module.exports = { isLoggedIn };