'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .post('/',
    (req, res, next) =>
      User.findOne({where:{
          email: req.body.email,
      }})
      .then(user => (!user) ? res.sendStatus(401) : req.session.userId = user.id, res.sendStatus(200))
      .catch(next)
    )