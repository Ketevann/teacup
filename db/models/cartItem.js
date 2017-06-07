'use strict'
const Sequelize = require('sequelize')
const db = require('./index.js')


module.exports = (db) => db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
