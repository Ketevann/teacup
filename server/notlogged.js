const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const NonLoggedCart = db.model('nonloggedcart')

const Order = db.model('order')
const Promise = require('bluebird')


module.exports = require('express').Router()

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


  .delete('/delete/:id', (req, res, next) => {
    console.log(req.body, 'req.body')
    NonLoggedCart.find({
      where: {
        product_id: req.params.id,
        sessionId: req.session.id
      }
    })
      .then(cart => {
        //	console.log(cart)
        return cart.destroy()
      })
      .then(() => res.send(204))
      .catch(err => console.log(err))
  })

  .put('/', (req, res, next) => {
    console.log(' in update', req.body)
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


  	.post('/', (req, res) => {
		console.log(' in not logged in', req.session.id, req.body)
		NonLoggedCart.find({
			where: {
				sessionId: req.session.id,
				product_id: req.body.productId
			}
		})
			.then(session => {
				if (!session) {
					console.log('session does not exist')
					return NonLoggedCart.create({

						quantity: req.body.quantity,
						price: req.body.price,
						sessionId: req.session.id,
						product_id: req.body.productId

					})
					// .then(cart => {
					// 	res.send(cart)
					// })
				} else {
					console.log(session, 'SESSION')


					let price = (Number(session.price) + Number(Number(req.body.price))),
						quantity = (Number(Number(req.body.quantity)) + Number(session.quantity))
					console.log((Number(session.price) + Number(price)), (Number(quantity) + Number(session.quantity)), ' CHECKING session', req.body.price, session.price, req.body.quantity, session.quantity, session)

					return session.update({ price: price, quantity: quantity },
						{
							where: {

								product_id: req.body.productId,
								sessionId: req.session.id
							}
						}
					)
						.then(updated => {
							console.log(updated, 'UPDATED')
							//	res.send(updated)

						})
				}

			})
			.then(() => {
				return NonLoggedCart.findAll({
					where: {
						sessionId: req.session.id,

					},
					include: [Product]
				})
					.then(cart => res.send({ items: cart, product: [] }))
			})
	})

  	.get('/', (req, res) => {
		console.log(' in not logged in', req.session.id, req.body)
		NonLoggedCart.findAll({
			where: {
				sessionId: req.session.id
			},
			include: [Product]
		})
			.then(orders => res.send({items: orders}))
			.catch(err => console.log(err))
	})