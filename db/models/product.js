'use strict'
var db = require('./index.js')
var Review = require('./review')
const Sequelize = require('sequelize');

module.exports = (db) => db.define('products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    inStock: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    inventory: {
        type: Sequelize.INTEGER,
        defaultValue: 100
    },
    categories: {
        type: Sequelize.ENUM('gluten free', 'vegan', 'Kettis pick!', 'unhealthy', 'chocolate', 'spicy', 'kosher', 'pickled'),
        defaultValue: 'unhealthy'
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'http://www.clker.com/cliparts/J/t/k/l/1/I/granola-bar-transparent-b-g-hi.png'
    },
},{
    instanceMethods:{
        getRating: function(){
            let ratingsNum = 0
            let reviewNum = 0

            Review.findAll({where: { 
                id: this.id
            }})
            .then(reviews => reviews.forEach(review => {
                ratingsNum += review.stars
                reviewNum++
            }))
            .then(() => {
                return ratingsNum/reviewNum;
            })
            .catch()
        },
    },
})

module.exports.associations = (Product, {CartItem, Order}) => {
    Product.belongsToMany(Order, {through: CartItem})
}