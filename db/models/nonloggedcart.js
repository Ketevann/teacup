'use strict'
const Sequelize = require('sequelize')
const db = require('./index.js')
const { STRING, DATE } = require('sequelize')


module.exports = (db) => db.define('nonloggedcart', {
 quantity: {
    type: Sequelize.INTEGER
    // validation: {
    //   min: 1
    // }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  sessionId: {
    type: Sequelize.STRING
  }
})



module.exports.associations = (NonLoggedCart, {Product, User, Order}) => {
  NonLoggedCart.belongsTo(Product)
  NonLoggedCart.belongsTo(Order)
}
