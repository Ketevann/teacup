const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const NonLoggedCart = db.model('nonloggedcart')

const Order = db.model('order')
const Promise = require('bluebird')


module.exports = require('express').Router()
  // delete a non logged cart for a specic session
  .delete('/', (req, res) => {
    NonLoggedCart.destroy({
      where: {
        sessionId: req.session.id
      }
    })
      .then(() => {
        res.send(204)
      })
      .catch(err => console.log(err))
  })

  //delete a cart item
  .delete('/delete/:id', (req, res, next) => {
    NonLoggedCart.find({
      where: {
        product_id: req.params.id,
        sessionId: req.session.id
      }
    })
      .then(cart => {
        return cart.destroy()
      })
      .then(() => res.send(204))
      .catch(err => console.log(err))
  })
  //update a cart item
  .put('/', (req, res, next) => {
    NonLoggedCart.find({
      where: {
        product_id: req.body.productId,
        sessionId: req.session.id
      }
    })
      .then(cart => {
        if (req.body.quantity === String(0)) {
          cart.destroy()
            .then(() => res.send(204))
        }
        else {
          cart.update({ quantity: req.body.quantity })
            .then(() => res.send(202))
        }
      })

  })

  // add to cart
  	.post('/', (req, res) => {
		NonLoggedCart.find({
			where: {
				sessionId: req.session.id,
				product_id: req.body.productId
			}
		})
			.then(session => {
        //if cart does not exist, create a new cart
				if (!session) {
					return NonLoggedCart.create({

						quantity: req.body.quantity,
						price: req.body.price,
						sessionId: req.session.id,
						product_id: req.body.productId

					})

				} else {
          // update quantity if the product is already in cart
				let quantity = (Number(Number(req.body.quantity)) + Number(session.quantity))

					return session.update({ quantity },
						{
							where: {
								product_id: req.body.productId,
								sessionId: req.session.id
							}
						}
					)
						.then(updated => {
							console.log('UPDATED')
						})
				}

			})
			.then(() => {
        // return all cart items
				return NonLoggedCart.findAll({
					where: {
						sessionId: req.session.id,
					},
					include: [Product]
				})
					.then(cart => res.send({ items: cart, product: [] }))
			})
	})
  // get all cart items
  	.get('/', (req, res) => {
		NonLoggedCart.findAll({
			where: {
				sessionId: req.session.id
			},
			include: [Product]
		})
			.then(orders => res.send({items: orders}))
			.catch(err => console.log(err))
	})