// require express module
const express = require('express');

// get sequelize connection from config/connection
const sequelize = require('./config/connection');

// import routes
const routes = require('./controllers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create();

const path = require('path');

// create new express app
const app = express();

const PORT = process.env.PORT || 3001;

// only looks at requests where the content header matches the type
// returns middleware that parses json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

// sync the database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
})