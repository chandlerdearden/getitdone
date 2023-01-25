const { DataTypes } = require('sequelize')
const {sequelize } = require('../util/database')

module.exports ={
    Tasks : sequelize.define('tasks', {
        task_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        desc: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN,
        Date: DataTypes.DATE
    })
}