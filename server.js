// require express module
const express = require('express');

// get sequelize connection from config/connection
const sequelize = require('./config/connection');

// import routes
const routes = require('./controllers');

// create new express app
const app = express();

const PORT = process.env.PORT || 3001;

// only looks at requests where the content header matches the type
// returns middleware that parses json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync the database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
})