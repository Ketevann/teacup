const db = require('APP/db')
const Products = db.model('products')
const Reviews = db.model('reviews')


module.exports = require('express').Router()
  .get('/categories/:category',
   (req, res, next) =>
     Products.findAll({
       where: {
         categoriezs: req.params.category
       }
     })
      .then((products) => {
        if (!products.length) {
          console.log(products, "err")
          const error = new Error()
          error.status = 404
          throw error
        } else res.json(products)
      })
      .catch(next)
  )
  .param('id',
  (req, res, next, productId) =>
    Products.findById(productId, { include: [Reviews] })
      .then((product) => {
        if (!product) {
          const error = new Error()
          error.status = 404
          throw error
        }
        req.product = product

        req.product.dataValues.avgReview = product.reviews.reduce((total, val) => {
          console.log("in reducer", total, val.stars)
          return total + val.stars;
        }, 0) / product.reviews.length;
        next()
      })
      .catch(next))
  .get('/:id',
    (req, res, next) => {
      console.log('anything', req.product)
      res.json(req.product)
    })
  .get('/',
     (req, res, next) =>
       Products.findAll({})
      .then((products) => {
        if (!products.length) {
          const error = new Error()
          error.status = 404
          throw error
        } else res.status(200).json(products)
      })
      .catch(next))
  .delete('/:id',
     (req, res, next) =>
     req.product.destroy({})
      .then(() => {
        res.sendStatus(204)
      })
      .catch(next))
