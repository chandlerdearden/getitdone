const {DataTypes} = require('sequelize')

const { sequelize } = require('../util/database')

module.exports = {
    Users: sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: DataTypes.STRING,
        color: DataTypes.STRING,
        username: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        hashedPassword: DataTypes.STRING
    })
}