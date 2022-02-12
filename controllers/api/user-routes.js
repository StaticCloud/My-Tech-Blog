// create express router for handling endpoints
const router = require('express').Router();

// import models
const { User, Comment, Post } = require('../../models')

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
        const user = await User.findByPk(req.params.id,
            {
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Comment,
                        attributes: ['text'],
                        include: [
                            {
                                model: Post,
                                attributes: ['title']
                            }
                        ]
                    }
                ]
            }
        );

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

        // save the new user to the session
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.status(200).json(user);
        })
    } catch (err) {
        // return client error message
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne(
        {
            where: {
                email: req.body.email
            }
        }
    )

    // if there was no user with that email, alert the client and return
    if (!user) { res.status(400).json({ message: 'No user with that email address!' }); return; }

    // check if the password was valid
    const isValidPw = user.checkPassword(req.body.password);

    // if the password was not valid, alert the client and return
    if (!isValidPw) { res.status(400).json({ message: 'Incorrect password!' }); return; }

    // save the user to the session
    req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.status(200).json({ user: user, message: 'Login successful!'});
    })
})

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

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;