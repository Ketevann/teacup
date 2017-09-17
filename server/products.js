const db = require('APP/db')
const Products = db.model('products')
const Reviews = db.model('reviews')

module.exports = require('express').Router()
  .get('/categories/:category',
  (req, res, next) => {
    return Products.findAll({
      where: {
        categoriezs: req.params.category
      }
    })
      .then((products) => {
        if (!products.length) {
          console.log(products, 'err')
          const error = new Error()
          error.status = 404
          throw error
        } else res.json(products)
      })
      .catch(next)
  })
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
          console.log('in reducer', total, val.stars)
          return total + val.stars
        }, 0) / product.reviews.length
        next()
      })
      .catch(next)
  })
  .get('/:id',
  (req, res, next) => {
    console.log('anything', req.product)
    res.json(req.product)
  })
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
  .put('/:id',
  (req, res, next) => {
    console.log(req.body, 'req.body')
    req.product.update(req.body)

      .then((products) => {
        console.log('products', products[0])
        res.status(200).json(products)
      })
      .catch(next)
  })
  .delete('/:id',
  (req, res, next) => {
    req.product.destroy({})
      .then(() => {
        res.sendStatus(204)
      })
      .catch(next)
  })



// const router = require('express').Router()

// router.get('/categories/:category',
//    (req, res, next) => {
//      return Products.findAll({
//        where: {
//          categoriezs: req.params.category
//        }
//      })
//       .then((products) => {
//         if (!products.length) {
//           console.log(products, 'err')
//           const error = new Error()
//           error.status = 404
//           throw error
//         } else res.json(products)
//       })
//       .catch(next)
//    })

// router.param('id',
//   (req, res, next, productId) => {
//     return Products.findById(productId, { include: [Reviews] })
//       .then((product) => {
//         if (!product) {
//           const error = new Error()
//           error.status = 404
//           throw error
//         }
//         req.product = product

//         req.product.dataValues.avgReview = product.reviews.reduce((total, val) => {
//           console.log('in reducer', total, val.stars)
//           return total + val.stars
//         }, 0) / product.reviews.length
//         next()
//       })
//       .catch(next)
//   })

// router.get('/:id',
//     (req, res, next) => {
//       console.log('anything', req.product)
//       res.json(req.product)
//     })

// router.get('/', (req, res, next) => {
//       console.log("routeee")
//        Products.findAll({})
//       .then((products) => {
//         if (!products.length) {
//           const error = new Error()
//           error.status = 404
//           throw error
//         } else res.status(200).json(products)
//       })
//       .catch(next)
//      })

// router.post('/',
//      (req, res, next) => {
//        Products.create(req.body)
//       .then((products) => {
//         res.status(200).json(products)
//       })
//      })

// router.put('/',
//      (req, res, next) => {
//        Products.update(req.body)
//       .then((products) => {
//         res.status(200).json(products)
//       })
//       .catch(next)
//      })

// router.delete('/:id',
//      (req, res, next) => {
//        req.product.destroy({})
//       .then(() => {
//         res.sendStatus(204)
//       })
//       .catch(next)
//      })

// module.exports = router

