'use strict';
var db = require('../index.js');

module.exports = db.define('order', {
    status: {
        type: Sequelize.ENUM('pending', 'on its way', 'sent'),
        defaultValue: 'pending'
    },
    shippingDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW 
    }
});

//copy and paste the state, city, street, zipCode, etc here for Shipping Address.