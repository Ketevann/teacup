'use strict'
const api = require('express').Router()
var Order = require('../db/models').order


api.get('/order', (req, res, next) => {
  return Order.findAll({})
    .then((orders) => {
      if (!orders) res.status(404).send('page Not Found')
      else res.send(orders)
    })
    .catch(console.error())
})


api.get('/order/:id', (req, res, next) => {
  return Order.findById(req.params.id)
    .then((order) => {
      if (!order) res.status(404).send('page Not Found')
      else res.send(order)
    })
    .catch(console.error())
})


api.get('/order/:userId', (req, res, next) => {
  return Order.findAll({
    where: {
      user_id: req.params.userId
    }
  })
    .then((orders) => {
      if (!orders) res.status(404).send('page Not Found')
      else res.send(orders)
    })
    .catch(console.error())
})


api.get('/order', (req, res, next) => {
  return Order.findAll({
    where: {
      user_id: req.body.userId
    }
  })
    .then((orders) => {
      if (orders === null) res.status(404).send('page Not Found')
      else res.send(orders)
    })
    .catch(console.error())
})



