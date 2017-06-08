'use strict'
const Sequelize = require('sequelize')
const db = require('./index.js')


module.exports = (db) => db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    validation: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER
  },
})

module.exports.associations = (CartItem, {Product}) => {
  CartItem.belongsTo(Product)
}
