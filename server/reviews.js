'use strict'

const db = require('APP/db')
const Product = db.model('products')
const User = db.model('users')

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
            },
            include: [User]
        })
            .then(reviews => res.send(reviews))
            .catch(next))

    .post('/',
    (req, res, next) =>
    {console.log(req.body, 'req body reviews')
        Review.find({
            where: {
                user_id: req.body.userId,
                product_id: req.body.productId
            }
        })
            .then(review => {

                if (!review) {

                    return Review.create({
                        content: req.body.content,
                        stars: req.body.stars,
                        product_id: req.body.productId,

                    })
                        .then(createdReview => {

                            console.log(req.body.userId, 'user ID')
                            return createdReview.setUser(req.body.userId)

                                .then(() => {
                                    return User.find({
                                        where: {
                                            id: createdReview.user_id
                                        }
                                    })
                                        .then(user => {
                                            createdReview.user = user

                                            res.send(createdReview)
                                        })


                                })
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
                                    id: review.user_id
                                }
                            })
                                .then(user => {
                                    updated.user = user

                                    res.send(updated)
                                })


                        })



                }

            })
    })

    .delete('/:id', (req, res) => {
        console.log(req.params.id)
        return Review.destroy({
            where: {
                id: req.params.id
            }
        })
            // .then(review => {
            //     console.log(review)
            //     return review.destory()
            // })
            .then(() => res.send(204))
            .catch(err => console.log(err))
    })