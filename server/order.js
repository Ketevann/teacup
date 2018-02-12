//const router = require('express').Router()
const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const Orders = db.model('order')
const Promise = require('bluebird')
const Users = db.model('users')


module.exports = require('express').Router()
 // get orders of all users
  //get all orders
  .get('/',
  (req, res, next) =>
    CartItem.findAll({
      include: [{model: Orders, include: [Users]}, {model: Product}]
    })

      // Order.findAll({
      //   inclide: [CartItem, Product]
      // })
      .then((orders) => {
        if (!orders.length) res.status(404).send('page Not Found')
        else res.send(orders)
      })
      .catch(console.error()))
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
  (req, res, next) =>{
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
   res.send(orders)
 })
 .catch(next)
  })

   // get orders for a specific user
  .get('/complete/user/:userId',
  (req, res, next) =>
    Orders.findAll({
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
    Orders.findOrCreate({where: {
      user_id: req.params.userId,
      status: 'pending'
    }})
    .then(order => {
      res.send(order[0])
    })
  .catch(next)
  })


.post('/:userId',
    (req, res, next) => {
      console.log(req.params.user_id, req.body,  ' in ORDER/USERID');
      Orders.create({
        status: 'created',
        shippingDate: new Date().toISOString().split('T')[0],
        Street: 'Hopper',
        Apartment: '3F',
        State: 'Maine',
        City: 'HopperVille',
        zipCode: '11122'
      })
 .then((orders) => {
   console.log(orders, 'orders')
  //  if (!orders.length) {
  //    var error = new Error()
  //    error.status = 404
  //    throw error
  //  }
   return orders.setUser(req.params.userId)
   .then(() => res.send(orders))

 })
 .catch(next)
    })
