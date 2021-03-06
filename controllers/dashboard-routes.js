// create express router for handling endpoints
const router = require('express').Router();
const auth = require('../helpers/auth');

const { Post, Comment, User } = require('../models');

router.get('/', auth, async (req, res) => {
    try {
        let posts = await Post.findAll(
            {
                where: {
                    user_id: req.session.user_id
                },
                attributes: ['id', 'title'],
                include: [
                    {
                        model: Comment
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        )
        posts = posts.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, username: req.session.username, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/create', auth, async (req, res) => {
    try {
        res.render('new-post', { loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/edit/:id', auth, async (req, res) => {
    try {
        let post = await Post.findByPk(req.params.id,
            {
                attributes: ['id', 'title', 'content', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username']
                    }
                ]
            }
        )

        if (post.user_id === req.session.user_id) {
            post = post.get({ plain: true });

            res.render('edit-post', { post, loggedIn: true });
        } else {
            res.render('bad-request', { loggedIn: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;