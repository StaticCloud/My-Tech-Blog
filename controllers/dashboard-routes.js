// create express router for handling endpoints
const router = require('express').Router();
const auth = require('../helpers/auth');

const { Post, Comment, User } = require('../models');

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.findAll(
            {
                where: {
                    user_id: req.session.user_id
                },
                attributes: ['title'],
                include: [
                    {
                        model: Comment
                    },
                    {
                        model: User
                    }
                ]
            }
        )
        res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;