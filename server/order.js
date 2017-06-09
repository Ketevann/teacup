const router = require('express').Router()
const Orders = require('../db/models/order')

module.exports = require('express').Router()
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
 .get('/:userId',
  (req, res, next) =>
  Orders.findAll({
    where: {
      user_Id: req.params.userId
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
 .catch(next))
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


