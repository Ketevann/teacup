'use strict'
const Sequelize = require('sequelize')
const db = require('../index.js')


module.exports = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

//??
//Product.hasMany(Order,{through: cartItem});
