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
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

// get by id or primary key
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        // return client error message
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

// post a new user to the db
router.post('/', async (req, res) => {
    try {
        const user = await User.create(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        )

        res.status(200).json(user);
    } catch (err) {
        // return client error message
        console.log(err);
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const response = await User.update(req.body,
            {
                individualHooks: true,
                where: {
                    id: req.params.id
                }
            }
        )

        // return client error message
        if (!response[0]) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        res.json({ message: 'User successfully updated' });
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const response = await User.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )

        // return client error message
        if (!response) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        res.json({ message: 'User successfully deleted' });
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;