// create express router for handling endpoints
const router = require('express').Router();

const { Post, User, Comment } = require('../models');

// home route
router.get('/', async (req, res) => {
    try {
        let posts = await Post.findAll(
            {
                attributes: ['id', 'title', 'content', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        )
        
        posts = posts.map(post => post.get({ plain: true }));

        res.render('homepage', { posts, loggedIn: req.session.loggedIn, singlePost: true });
        
    } catch (err) {
        // server error
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/posts/:id', async (req, res) => {
    try {
        let post = await Post.findByPk(req.params.id,
            {
                attributes: ['id', 'title', 'content', 'created_at'],
                order: [['created_at', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes: ['text', 'created_at'],
                        include: [
                            {
                                model: User,
                                attributes: ['username']
                            }
                        ]
                    }
                ]
            }
        )

        post = post.get({ plain: true });

        res.render('single-post', { post, loggedIn: req.session.loggedIn, singlePost: false });
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

// login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { res.redirect('/'); return; }

    res.render('login');
})

module.exports = router;