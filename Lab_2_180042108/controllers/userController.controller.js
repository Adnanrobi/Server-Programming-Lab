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

const postRegister = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const retype = req.body.retype;

    try
    {
        const user = await User.findone({ email });
        if (user)
        {
            alert("Already registered");
            res.redirect("/login")
        }
        else if (password.length < 6)
        {
            alert("Password must be at least 6 characters!");
            res.redirect("/register");
        }
        else if (password !== retype)
        {
            alert("Retype the password properly")
            res.redirect("/register");
        }
        else if (!name || !email || !password || !retype)
        {
            alert("fields can't be empty")
            res.redirect("/register");
        }
        else
        {
            const salt = await bcrypt.genSaltSync(8);
            const passwordHash = await bcrypt.hash(password, salt);
            const createUser = new User({
                name,
                email,
                passwordHash
            });
            await createUser.save();
            alert("Success!");
            res.redirect('/login');
        }
    }

    catch (error)
    {
        console.error(error);
        alert('Something went wrong');
        res.redirect('/register');
    }    
};

module.exports = {
    getLandingPage,
    getLoginPage,
    getRegisterPage,
    postRegister
};