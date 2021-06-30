const getLogin = (req, res) => {
    res.render('users/login-v2.ejs')
}

const postLogin = (req, res) => {

}

const getRegister = (req, res) => {
    res.render('users/register-v2.ejs')
}

const postRegister = (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirm_password);
}

module.exports = {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
}