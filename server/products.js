const api = require('express').Router()
var Products = require('../db/models').product



api.get('/products', (req, res, next){
  return Products.findAll({})
    .then((products) => {
      if (!products)
        res.status(404).send("Page not found")
      else res.send(products)
    })
    .catch(console.error())
}),

api.get('/products/:id', (req, res, next) => {
  Products.findById(req.params.id)
    .then(product => {
      if (!product) res.status(404).send("Page not found")
      else res.send(product)
    })
    .catch(console.error())
}),

api.get('/product', (req, res, next) => {
  return Products.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(product => {
      if (!product) res.status(404).send("Page not found")
      else res.send(product)
    })
    .catch(console.error())
}),

api.delete('/product/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      return product.destroy({})
    })
    .then(() => {
      res.send(204)
    })
    .catch(console.error())
})
