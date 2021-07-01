const User = require('../models/User.model');
const bcrypt = require('bcryptjs');


const getLogin = (req, res) => {
    res.render('users/login.ejs')
}

const postLogin = (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
}

const getRegister = (req, res) => {
    res.render('users/register.ejs', { errors: req.flash('errors') });
}

const postRegister = (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    const errors = []
    if (!name || !email || !password || !confirm_password) {
        errors.push("All fields are required");
    }
    if (password.length < 6) {
        errors.push("Passwords must be at least 6 characters");
    }
    if (password !== confirm_password) {
        errors.push("Passwords do not match");
    }
    if (errors.length > 0) {
        req.flash('errors', errors);
        res.redirect("/users/register");
    } else {
        //Create a new user:
        User.findOne({ email: email }).then((user) => {
            if (user) {
                errors.push("this email is already registered");
                req.flash('errors', errors);
                res.redirect("/users/register");
            } else {
                bcrypt.genSalt(8, (err, salt) => {
                    if (err) {
                        errors.push(err);
                        req.flash('errors', errors);
                        res.redirect("/users/register");
                    } else {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                errors.push(err);
                                req.flash('errors', errors);
                                res.redirect("/users/register");
                            } else {
                                const newUser = new User({
                                    name, email, password: hash
                                });
                                newUser
                                    .save()
                                    .then(() => {
                                    res.redirect("/users/login");
                                    })
                                    .catch(() => {
                                        errors.push("Saving user in Database failed");
                                        req.flash(errors);
                                        res.redirect("/users/register")
                                    })
                            }
                        })
                    }
                })
            }
        });
    }
    
};

//Data validation:



module.exports = {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
}