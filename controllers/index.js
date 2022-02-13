// create express router for handling endpoints
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

// use /api endpoint for api routes
router.use('/api', apiRoutes);

router.use('/dashboard', dashboardRoutes);

// / endpoint for home routes 
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;