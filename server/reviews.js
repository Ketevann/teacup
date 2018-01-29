'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Review = db.model('reviews')

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
    .get('/user/:userId',
    (req, res, next) => {
        console.log('in reviews *************************', typeof req.params.userId)
        Review.findAll({
            where: {
                user_id: req.params.userId
            }
        })
            .then(reviews => {
                console.log(reviews, req.params.userId)
                res.send(reviews)
            })
            .catch(next)
    })
    .get('/',
    (req, res, next) =>
        Review.findAll({})
            .then(reviews => res.send(reviews))
            .catch(next))
    .get('/:productId',
    (req, res, next) =>
        Review.findAll({
            where: {
                product_id: req.params.productId
            }
        })
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