'use strict'
const Sequelize = require('sequelize')
var db = require('../index.js')

module.exports = db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'on its way', 'sent'),
    defaultValue: 'pending'
  },
  shippingDate: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  Street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Apartment: {
    type: Sequelize.STRING,
    allowNull: false
  },
  State: {
    type: Sequelize.ENUM('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode')
  },
  City: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.INTEGER
  },
})



