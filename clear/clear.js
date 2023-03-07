const sequelize = require('../config/connection.js');
const { User, Post, Comment } = require('../models')

const clear = async () => {
    await sequelize.sync({ force: true });
    await sequelize.drop()

    process.exit(0);
}

clear();