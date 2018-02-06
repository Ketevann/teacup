'use strict'

const db = require('APP/db')
const Product = db.model('products')
const User = db.model('users')

const Review = db.model('reviews')

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
    // get user reviews and associate products
    .get('/user/:userId',
    (req, res, next) => {
        Review.findAll({
            where: {
                user_id: req.params.userId
            },
            include: [Product]
        })
            .then(reviews => {
                res.send(reviews)
            })
            .catch(next)
    })
    // get all reviews
    .get('/',
    (req, res, next) =>
        Review.findAll({})
            .then(reviews => res.send(reviews))
            .catch(next))
    // get reviews for specific products and associated users
    .get('/:productId',
    (req, res, next) =>
        Review.findAll({
            where: {
                product_id: req.params.productId
            },
            include: [User]
        })
            .then(reviews => res.send(reviews))
            .catch(next))

    //post a new review. If a reviews already exists update an existing review
    .post('/',
    (req, res, next) => {
        console.log(req.body, 'req body reviews')
        return Review.find({
            where: {
                user_id: req.body.userId,
                product_id: req.body.productId
            }
        })
            .then(review => {
                //if review does not already exist, create a new review
                if (!review) {
                    return Review.create({
                        content: req.body.content,
                        stars: req.body.stars,
                        product_id: req.body.productId,

                    }).then(createdReview => {
                            return createdReview.setUser(req.body.userId)

                                .then(() => {
                                    return User.find({
                                        where: {
                                            id: req.body.userId
                                        }
                                    })
                                     .then(user => {
                                            return res.send({ review: createdReview, user })
                                        })

                                }).catch(err => console.log(err))
                        })
                }
                else {
                    let updatedContent = req.body.content,
                        updatedStars = req.body.stars
                    if (!req.body.content) updatedContent = review.content
                    if (!req.body.stars) updatedStars = review.stars

                    return review.update({
                        content: updatedContent, stars: updatedStars
                    }, {
                            where: {
                                product_id: req.body.productId,
                                user_id: req.body.userId
                            }
                        })
                        .then(updated => {
                            return User.find({
                                where: {
                                    id: req.body.userId
                                }
                            })
                                .then(user => {
                                    return res.send({ review: updated, user })
                                })
                        })
                        .catch(err => console.log(err))
                }

            }).catch(err => console.log(err))
    })

    //delete a specific review
    .delete('/:id', (req, res) => {
        console.log(req.params.id)
        return Review.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => res.send(204))
            .catch(err => console.log(err))
    })