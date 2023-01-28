const { DataTypes } = require('sequelize')
const {sequelize } = require('../util/database')

module.exports ={
    Tasks : sequelize.define('tasks', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        desc: DataTypes.TEXT,
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        colorEvento: DataTypes.STRING,
    })
}