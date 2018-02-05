'use strict'
const Sequelize = require('sequelize')
const db = require('./index.js')


module.exports = (db) => db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER
    // validation: {
    //   min: 1
    // }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  }
})

module.exports.associations = (CartItem, {Product, User, Order}) => {
  CartItem.belongsTo(Product)
  CartItem.belongsTo(Order)
}
