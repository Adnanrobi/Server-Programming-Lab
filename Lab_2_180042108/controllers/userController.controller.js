const getLandingPage = (req, res) => {
    res.sendFile('index3.html', { root: './views' });
};
const getLoginPage = (req, res) => {
    res.sendFile('login.html', { root: './views/pages/examples' });
};

module.exports = {
    getLoginPage,
    getLandingPage
};