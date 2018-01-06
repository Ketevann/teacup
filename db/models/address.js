'use strict'
var db = require('./index.js')
const Sequelize = require('sequelize')

module.exports = (db) => db.define('address', {
  Street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Apartment: {
    type: Sequelize.STRING,
    allowNull: false
  },
  State: {
    type: Sequelize.ENUM('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island'),
    allowNull: false
  },
  City: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.INTEGER
    // validate: {
    //   len: [5]
    // }
  },
})

module.exports.associations = (Address, {User, CartItem, Payment, Product}) => {
    Address.belongsToMany(Order)
    Address.belongsToMany(Payment)
}

