// require express module
const express = require('express');

// get sequelize connection from config/connection
const sequelize = require('./config/connection');

// create new express app
const app = express();

const PORT = process.env.PORT || 3001;

// sync the database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
})