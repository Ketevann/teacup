'use strict'
const db = require('APP/db')
const User = db.model('users')
const Payment = db.model('payment')
const Orders = db.model('order')
const Reviews = db.model('reviews')
const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
      User.findAll({
        include: [Payment, Orders, Reviews]
      })
    .then(users => {
      res.send(users)
    })
    .catch(next)
    //}
  })
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .delete('/:id', (req, res, next) => {
    User.findById(req.params.id)
          .then(user =>{
           return user.destroy()
           .then(() =>{
             res.sendStatus(204)})
         })
  })
  .put('/promote/:id', (req, res, next) => {
       User.findById(req.params.id)
        .then((user) => {
          if (req.body.role === 'user')
           return user.update({role: 'user'})
          else if  (req.body.role === 'admin')
          return user.update({role: 'admin'})
        })
        .then((upUser) => {
          if (upUser) res.send(upUser)
          else res.status(404).send('Not successfully updated')
        })
  })
  .put('/updatePassword/:userId', (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
          return user.authenticate(req.body)
        })
        .then((upUser) => {
          if (upUser) res.sendStatus(200)
          else res.status(404).send('Not successfully updated')
        })
  })
