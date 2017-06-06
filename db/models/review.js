'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js');

module.exports = db.define('review', {
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
    }
});