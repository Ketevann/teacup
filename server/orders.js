'use strict'
const api = require('express').Router()
const db = require('APP/db')
const Order = db.model('order')
const CartItem = db.model('cartItem')
const Product = db.model('products')

module.exports = require('express').Router()
.get('/',
  (req, res, next) =>
   Order.findAll({})
    .then((orders) => {
      if (!orders.length) res.status(404).send('page Not Found')
      else res.send(orders)
    })
   .catch(console.error()))
.get('/user/:userId',
 (req, res, next) =>
   Order.findAll({
     where: {
       user_id: req.params.userId
     }
   })
.then((orders) => {
  console.log('orders in server', orders)

    var filterOrders = orders.map(order => order.id)
console.log('FILTER ORDWES', filterOrders)
      CartItem.findAll({
        where: {
          order_id: [...filterOrders]
        },
        include: [Product]
      })
      .then(cart =>{
        console.log(cart, 'RES RES')
         if(!cart) res.status(404).send('page Not Found')
      else {

          console.log('cart333 in server', cart)

        res.send({orders, cart})}
      })

     })
    .catch(next))

.get('/:id',
 (req, res, next) =>
   Order.findById(req.params.id)
    .then((order) => {
      if (!order) res.status(404).send('page Not Found')
      else res.send(order)
    })
    .catch(console.error()))

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
