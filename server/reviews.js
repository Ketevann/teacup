'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Review = db.model('reviews')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Review.findAll({})
      .then(reviews => res.send(reviews))
      .catch(next))
  .get('/:productId',
    (req, res, next) =>
      Review.findAll({where: {
          product_id: req.params.productId
      }})
      .then(reviews => res.send(reviews))
      .catch(next))
   .post('/',
    (req, res, next) =>
        Review.create({
            content: req.body.content,
            stars: req.body.stars,
            product_id: req.body.productId,
            user_id: req.body.userId,
        })
        .then(review => res.send(review))
        .catch(next))