// create express router for handling endpoints
const router = require('express').Router();

// import models
const { Post, User, Comment } = require('../../models');

// get posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll(
            {
                attributes: ['id', 'title', 'content'],
                order: [['created_at', 'DESC']]
            }
        )

        res.status(200).json(posts);
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

// get posts
router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.findByPk(req.params.id,
            {
                attributes: ['id', 'title', 'content'],
                order: [['created_at', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes: ['text'],
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

        res.status(200).json(posts);
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

// post route for post
router.post('/', async (req, res) => {
    try {
        const post = await Post.create(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            }
        )

        res.status(200).json(post);
    } catch (err) {
        // return client error message
        console.log(err);
        res.status(400).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const response = await Post.update(req.body,
            {
                individualHooks: true,
                where: {
                    id: req.params.id
                }
            }
        )

        // return client error message
        if (!response[0]) {
            res.status(400).json({ message: 'Post not found' });
            return;
        }

        res.json({ message: 'Post successfully updated' });
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const response = await Post.destroy(
            {
                where: { 
                    id: req.params.id 
                }
            }
        );

        // return client error message
        if (!response) {
            res.status(400).json({ message: 'Post not found' });
            return;
        }

        res.json({ message: 'Post successfully deleted' });
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;