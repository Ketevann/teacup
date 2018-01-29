'use strict';
var db = require('./index.js');
const Sequelize = require('sequelize');

module.exports = (db) => db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'on its way', 'sent', 'canceled', 'created'),
    defaultValue: 'created'
  },
  shippingDate: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  Street: {
    type: Sequelize.STRING,
  },
  Apartment: {
    type: Sequelize.STRING,
  },
  State: {
    type: Sequelize.ENUM('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode')
  },
  City: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.INTEGER
    // validation: {
    //  len: [5]
    // }
  },
}, {
  instanceMethods: {
    setStatus: function(status) {
      this.status = 'sent'
      return this.save()
    },
  },
})

module.exports.associations = (Order, {User, CartItem, Payment, Product}) => {
  Order.belongsTo(User)
  Order.hasMany(CartItem)
  Order.belongsToMany(Product, {through: CartItem})

}

