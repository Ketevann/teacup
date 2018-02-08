//const router = require('express').Router()
const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const Orders = db.model('order')
const Promise = require('bluebird')

module.exports = require('express').Router()
  // get orders of all users
  .get('/',
  (req, res, next) =>
    Orders.findAll({})
      .then((orders) => {
        if (!orders.length) {
          let error = new Error()
          error.status = 404
          throw error
        }
        res.send(orders)
      })
      .catch(next))
  //get specific order
  .get('/:orderId',
  (req, res, next) => {
    Orders.findAll({
      where: {
        id: req.params.orderId
      }
    })
      .then((orders) => {
        if (!orders.length) {
          var error = new Error()
          error.status = 404
          throw error
        }
        res.send(orders)
      })
      .catch(next)
  })
  //get specific user order
  .get('/users/:userId',
  (req, res, next) => {
    Orders.find({
      where: {
        user_id: req.params.userId,
        status: 'created'
      }
    })
      .then((orders) => {
        if (!orders) {
          res.send(null)
        }
        else {
          res.send(orders)
        }
      })
      .catch(next)
  })
  // get order status
  .get('/:status',
  (req, res, next) =>
    Orders.findAll({
      where: {
        status: req.params.status
      }
    })
      .then(orders => {
        if (!orders.length) {
          var error = new Error()
          error.status = 404
          throw error
        }
      })
      .catch(next))
  // update order status
  .put('/:status',
  (req, res, next) =>
    Orders.update({
      status: req.params.status
    })
      .then(orders => {
        if (!orders.length) {
          var error = new Error()
          error.status = 404
          throw error
        }
      })
      .catch(next))
  .get('/current/:userId',  // there can only be one 'pending' order per user
  (req, res, next) => {
    Orders.findOrCreate({
      where: {
        user_id: req.params.userId,
        status: 'pending'
      }
    })
      .then(order => {
        res.send(order[0])
      })
      .catch(next)
  })


  .post('/:userId',
  (req, res, next) => {
    Orders.create(req.body.itemInfo)
      .then((orders) => {
        //  if (!orders.length) {
        //    var error = new Error()
        //    error.status = 404
        //    throw error
        //  }
        orders.setUser(req.params.userId)
        res.send(orders)
      })
      .catch(next)
  })
