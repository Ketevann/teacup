const router = require('express').Router()
var Products = require('../db/models').product



router.get('/products', (req, res, next) => {
  return Products.findAll({})
    .then((products) => {
      if (!products.length) {
        const error = new Error()
        error.status = 404
        throw error
      } else res.send(products)
    })
    .catch(next)
})

router.param('id', (req, res, next, productId) => {
  Products.findById(productId)
      .then((foundProductId) => {
        if (!foundProductId) {
          const error = new Error()
          error.status = 404
          throw error
        }
        req.id = foundProductId
        next()
      })
      .catch(next)
})

router.get('/products/:id', (req, res, next) => {
  res.send(req.id)
})


router.get('/products/:category', (req, res, next) => {
  return Products.findAll({
    where: {
      categories: req.params.category
    }
  })
    .then((products) => {
      if (!products.length) {
        const error = new Error()
        error.status = 404
        throw error
      } else res.send(products)
    })
    .catch(next)
})

router.delete('/product/:id', (req, res, next) => {
  return req.id.destroy({})
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

