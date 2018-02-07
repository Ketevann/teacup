'use strict'
const api = require('express').Router()
const db = require('APP/db')
const Order = db.model('order')
const CartItem = db.model('cartItem')
const Product = db.model('products')

module.exports = require('express').Router()
  //get all orders
  .get('/',
  (req, res, next) =>
    Order.findAll({})
      .then((orders) => {
        if (!orders.length) res.status(404).send('page Not Found')
        else res.send(orders)
      })
      .catch(console.error()))
  // get orders for a specific user
  .get('/user/:userId',
  (req, res, next) =>
    Order.findAll({
      where: {
        user_id: req.params.userId,
        status: ['pending', 'on its way', 'sent', 'canceled']


      }
    })
      .then((orders) => {
        //gets cart items and associated products for a given order
        var filterOrders = orders.map(order => order.id)
        CartItem.findAll({
          where: {
            order_id: [...filterOrders]
          },
          include: [Product]
        })
          .then(cart => {
            if (!cart) res.status(404).send('page Not Found')
            else {
              res.send({ orders, cart })
            }
          })

      })
      .catch(next))
// gets a specific order
  .get('/:id',
  (req, res, next) =>
    Order.findById(req.params.id)
      .then((order) => {
        if (!order) res.status(404).send('page Not Found')
        else res.send(order)
      })
      .catch(console.error()))
// creates an order for a specific user
  .post('/:userId',
  (req, res, next) => {
    Order.create({
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
