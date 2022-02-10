// create express router for handling endpoints
const router = require('express').Router();

const userRoutes = require('./user-routes')

router.use('/users', userRoutes);

module.exports = router;