'use strict'
var db = require('./index.js')
const Sequelize = require('sequelize');

module.exports = (db) => db.define('products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    inStock: {
        type: Sequelize.STRING,
        defaultValue: true,
        allowNull: false
    },
    inventory: {
        type: Sequelize.STRING,
        defaultValue: 100,
        allowNull: false
    },
    categories: {
        type: Sequelize.ENUM('green tea', 'black tea', 'white tea', 'herbal tea', 'earl gray tea', 'jasmine tea', 'apple tea', 'rose tea', 'peppermint tea')

    },
    img: {
        type: Sequelize.STRING

    },
})

module.exports.associations = (Product, { CartItem, Review, Order }) => {
    //Product.belongsToMany(Order, {through: CartItem})
    Product.hasMany(Review)
}
