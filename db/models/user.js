'use strict'
const Sequelize = require('sequelize')
var db = require('./index.js')


module.exports = (db) => db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
            unique: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaulValue: false
    },
})


module.exports.associations = (User, {Order}) => {
  User.hasMany(Order)
}
