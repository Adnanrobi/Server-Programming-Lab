const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/users/welcome.ejs');
})

module.exports = router;