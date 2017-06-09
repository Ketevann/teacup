'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
 
  forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
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
    User.findbyId(req.params.id)
          .destroy((arr) => {
            if (Array.isArray(arr)) {
              res.sendStatus(204)
            } else res.status(500).send('Could not be destroyed')
          })
  })
  .put('/promote/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
          return user.update({role: 'admin'})
        })
        .then((upUser) => {
          if (upUser) res.sendStatus(200)
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
