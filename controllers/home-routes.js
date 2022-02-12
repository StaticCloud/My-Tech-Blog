// create express router for handling endpoints
const router = require('express').Router();

const { Post, User } = require('../models');

// home route
router.get('/', async (req, res) => {
    try {
        let posts = await Post.findAll(
            {
                attributes: ['title', 'content'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        )
        
        posts = posts.map(post => post.get({ plain: true }));

        res.render('homepage', { posts });
        
    } catch (err) {
        // server error
        console.log(err);
        res.status(500).json(err);
    }
})

// login route
router.get('/login', async (req, res) => {
    (req.session.loggedIn) ? res.redirect('/') : null;

    res.render('login');
})

module.exports = router;