const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    // check the user password
    checkPassword(login_password) { return bcrypt.compareSync(login_password, this.password) };
};

// init model, which is a table in our database
User.init(
    // remind me to never use 'allowNull: false' when defining a foreign key column
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [7]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            }
        },
        // include the sequelize connection (mandatory)
        sequelize,
        // dont include timestamps such as created/updatedAt
        timestamps: false,
        // convert camelCase columns to underscored
        underscored: true,
        // pluralize table name
        freezeTableName: true,
        // name of model
        modelName: 'user'
    }
)

module.exports = User;