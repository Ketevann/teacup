'use strict'
const api = require('express').Router()
const db = require('APP/db')
const Order = db.model('order')

module.exports = require('express').Router()
.get('/',
  (req, res, next) =>
   Order.findAll({})
    .then((orders) => {
      if (!orders.length) res.status(404).send('page Not Found')
      else res.send(orders)
    })
   .catch(console.error()))
.get('/:id',
 (req, res, next) =>
   Order.findById(req.params.id)
    .then((order) => {
      if (!order) res.status(404).send('page Not Found')
      else res.send(order)
    })
    .catch(console.error()))

.get('/:userId',
 (req, res, next) =>
   Order.findAll({
     where: {
       user_id: req.params.userId
     }
   })
.then((orders) => {
      if (!orders) res.status(404).send('page Not Found')
      else res.send(orders)
    })
    .catch(next))


// const router = require('express').Router()
// router.get('/order',
//   (req, res, next) =>
//    Order.findAll({})
//     .then((orders) => {
//       if (!orders.length) res.status(404).send('page Not Found')
//       else res.send(orders)
//     })
//    .catch(console.error()))
// router.get('/order/:id',
//  (req, res, next) =>
//    Order.findById(req.params.id)
//     .then((order) => {
//       if (!order) res.status(404).send('page Not Found')
//       else res.send(order)
//     })
//     .catch(console.error()))
// router.get('/order/:userId',
//  (req, res, next) =>
//    Order.findAll({
//      where: {
//        user_id: req.params.userId
//      }
//    })
//   )
// .then((orders) => {
//       if (!orders) res.status(404).send('page Not Found')
//       else res.send(orders)
//     }
//     .catch(next))

// module.exports = router
