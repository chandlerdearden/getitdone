const { DataTypes} = require('sequelize')
const {sequelize } = require('../util/database')

module.exports = {
    Projects : sequelize.define('projects',{
        project_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        desc: DataTypes.TEXT,
        start_date:DataTypes.DATE,
        end_date:DataTypes.DATE,
        completed: DataTypes.BOOLEAN
    })
}