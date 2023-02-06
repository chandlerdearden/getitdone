const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Messages : sequelize.define('messages', {
        message_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        creator_id: DataTypes.INTEGER,
        content: DataTypes.STRING,
        subject: DataTypes.STRING,
        read: {
            type :DataTypes.BOOLEAN,
            defaultValue: false
        } 
            
    })
}