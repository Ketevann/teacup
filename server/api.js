'use strict'

const api = module.exports = require('express').Router()

api
  .use((req, res, next)=> {
    console.log('flow')
    next()
  })
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/reviews', require('./reviews'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
