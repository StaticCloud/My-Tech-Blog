// create express router for handling endpoints
const router = require('express').Router();

const { Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        let posts = await Post.findAll(
            {
                attributes: ['title', 'content']
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

module.exports = router;