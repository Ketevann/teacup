'use strict'
const api = require('express').Router()
var Order = require('../db/models').order


module.exports = require('express').Router()
.get('/order',
  (req, res, next) =>
   Order.findAll({})
    .then((orders) => {
      if (!orders) res.status(404).send('page Not Found')
      else res.send(orders)
    })
   .catch(console.error()))
.get('/order/:id',
 (req, res, next) =>
   Order.findById(req.params.id)
    .then((order) => {
      if (!order) res.status(404).send('page Not Found')
      else res.send(order)
    })
    .catch(console.error()))
 .get('/order/:userId',
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
    .catch(console.error()))
 .get('/order', (req, res, next) =>
   Order.findAll({
     where: {
       user_id: req.body.userId
     }
   })
    .then((orders) => {
      if (orders === null) res.status(404).send('page Not Found')
      else res.send(orders)
    })
    .catch(console.error()))



