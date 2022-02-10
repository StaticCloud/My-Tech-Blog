// create express router for handling endpoints
const router = require('express').Router();

const apiRoutes = require('./api');

// use /api endpoint for api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;