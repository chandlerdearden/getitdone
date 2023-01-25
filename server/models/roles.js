const {DataTypes} = require('sequelize')
const {sequelize } = require('../util/database')

module.exports = {
    Roles : sequelize.define('roles', {
        role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        role: DataTypes.STRING
    })
}