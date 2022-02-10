// create express router for handling endpoints
const router = require('express').Router();

// import models
const { User } = require('../../models')

router.get('/', async (req, res) => {
    // try/catch block
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
    
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;