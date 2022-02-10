// create express router for handling endpoints
const router = require('express').Router();

const { User, Post, Comment } = require('../../models');

// get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll(
            {
                attributes: ['id', 'text']
            }
        )

        res.status(200).json(comments);
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

// get individual comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id,
            {
                attributes: ['id', 'text'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Post,
                        attributes: ['title']
                    }
                ]
            }
        )

        res.status(200).json(comment);
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

// new comment
router.post('/', async (req, res) => {
    try {
        const comment = await Comment.create(
            {
                text: req.body.text,
                // development purposes
                user_id: req.body.user_id,
                post_id: req.body.post_id
            }
        )

        res.status(200).json(comment);
    } catch (err) {
        // return client error message
        console.log(err);
        res.status(400).json(err);
    }
})

// update comment
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.update(req.body,
            {
                individualHooks: true,
                where: {
                    id: req.params.id
                }
            }
        )

        // return client error message
        if (!comment[0]) {
            res.status(400).json({ message: 'Comment not found' });
            return;
        }

        res.json({ message: 'Comment successfully updated' });
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

// delete comment
router.delete('/:id', async (req, res) => {
    try {
        const response = await Comment.destroy(
            {
                where: { 
                    id: req.params.id 
                }
            }
        );

        // return client error message
        if (!response) {
            res.status(400).json({ message: 'Comment not found' });
            return;
        }

        res.json({ message: 'Comment successfully deleted' });
    } catch (err) {
        // return server error message
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;