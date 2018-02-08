const db = require('APP/db')
const Products = db.model('products')
const Reviews = db.model('reviews')

module.exports = require('express').Router()
  //get product by category
  .get('/categories/:category',
  (req, res, next) => {
    return Products.findAll({
      where: {
        categoriezs: req.params.category
      }
    })
      .then((products) => {
        if (!products.length) {
          const error = new Error()
          error.status = 404
          throw error
        } else res.json(products)
      })
      .catch(next)
  })
     .put('/quantity/:id',
  (req, res, next) => {
    Products.find({where: {
      id: req.params.id
    }})
    .then(product =>{
      return product.update({inventory: Number(product.inventory) - Number(req.body.quantity)})
      .then((updatedproduct) => {
        return res.status(200).json(updatedproduct)
      })
    })

      .catch(next)
  })
  //get product by id
  .param('id',
  (req, res, next, productId) => {
    return Products.findById(productId, { include: [Reviews] })
      .then((product) => {
        if (!product) {
          const error = new Error()
          error.status = 404
          throw error
        }
        req.product = product

        req.product.dataValues.avgReview = product.reviews.reduce((total, val) => {
          return total + val.stars
        }, 0) / product.reviews.length
        next()
      })
      .catch(next)
  })
  //get product by id
  .get('/:id',
  (req, res, next) => {
    res.json(req.product)
  })
  // get all products
  .get('/', (req, res, next) => {
    Products.findAll({})
      .then((products) => {
        if (!products.length) {
          const error = new Error()
          error.status = 404
          throw error
        } else res.status(200).json(products)
      })
      .catch(next)
  })
  //create a new product
  .post('/',
  (req, res, next) => {
    if (req.body.name === "")
      res.end()
    else {
      Products.create(req.body)
        .then((products) => {
          res.status(200).json(products)
        })
    }
  })
  // update a specific product
  .put('/:id',
  (req, res, next) => {
    req.product.update(req.body)
      .then((products) => {
        res.status(200).json(products)
      })
      .catch(next)
  })

  //delete a specific product
  .delete('/:id',
  (req, res, next) => {
    req.product.destroy({})
      .then(() => {
        res.sendStatus(204)
      })
      .catch(next)
  })


