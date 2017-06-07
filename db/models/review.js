'use strict';
var Sequelize = require('sequelize')
var db = require('./index.js');

module.exports = (db) => db.define('review', {
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stars: {
        type: Sequelize.INT,
        validate: {
            min: 0,
            max: 5
        }
    },
})

module.exports.associations = (Review, {Product, User}) => {
  Review.belongsTo(Product)
  Review.belongsTo(User)
}
