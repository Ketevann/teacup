'use strict';
var db = require('./index.js');
var Review = require('./review')

module.exports = (db) => db.define('product', {
    name: {
        type: Sequelize.String,
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
        type: Sequelize.INT,
        defaultValue: 100
    },
    categories: {
        type: Sequelize.ENUM('gluten free', 'vegan', 'Ketti\'s pick!', 'unhealthy', 'chocolate', 'spicy', 'kosher', 'pickled'),
        defaultValue: 'unhealthy'
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'http://www.clker.com/cliparts/J/t/k/l/1/I/granola-bar-transparent-b-g-hi.png'
    }
},{
    instanceMethods:{
        getRating: function(){
            let ratingsNum = 0;
            let reviewNum = 0;

            Review.findAll({where: { 
                id: this.id
            }})
            .then(reviews => reviews.forEach(review => {
                ratingsNum += review.stars;
                reviewNum++;
            }))
            .then(() => {
                return ratingsNum/reviewNum;
            })
            .catch();
        }
    }
});
