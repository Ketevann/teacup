const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const NonLoggedCart = db.model('nonloggedcart')

const Order = db.model('order')
const Promise = require('bluebird')

module.exports = require('express').Router()
// add item to cart
	.post('/', (req, res, next) => {
		console.log('in cart item', req.body)
		let price = Number(req.body.price)
		let product_id = req.body.productId
		let order_id = req.body.orderId
		let quantity = req.body.quantity

		let newCartItem = { price: price, product_id: product_id, order_id: order_id, quantity: quantity }
		// if cart does not exist, create a new cart
		CartItem.find({
			where: {
				order_id: order_id,
				product_id: product_id
			}
		})
			.then(cart => {
				if (!cart) {
					return CartItem.create(newCartItem)
				}
				else {
					// if product already in a cart, updates quanity of the product
					let	quantity = (Number(Number(req.body.quantity)) + Number(cart.quantity))
									return cart.update({ quantity },
						{
							where: {
								product_id: product_id,
								order_id: req.body.orderId
							}
						}
					)

				}
			})	// return all cart items and associated products
					.then(product => {
						return CartItem.findAll({
							where: {
								order_id: req.body.orderId
							},
							include: [{ model: Product }]
						})
							.then(items => {
								res.send({ items, product: [] })
							})
					})
			.catch(next)

	})
	// get all items from cart for  a specific order number
	.get('/all/:orderId', (req, res, next) => {
		let found, promises = []
		let orderId = req.params.orderId
		// get items from logged in cart
		CartItem.findAll({
			where: {
				order_id: orderId
			},
			include: [{ model: Product }]
		})
			.then(items => {
				// get items from non logged cart
				NonLoggedCart.findAll({
					where: {
						sessionId: req.session.id
					}
				})
					.then(sessionCartItems => {
						let found, promises = []
						// merge non logged and logged cart items
						sessionCartItems.forEach(notLoggedIn => {
							found = false;
							for (var i = 0; i < items.length; i++) {
								// when product ids match -
								if (items[i].dataValues.product_id ===
									notLoggedIn.dataValues.product_id
								) {
									found = true;
									// let price = Number(items[i].dataValues.price) +
									// 	Number(notLoggedIn.dataValues.price);
									let quantity = Number(items[i].dataValues.quantity) +
										Number(notLoggedIn.dataValues.quantity);

									var newPromise = items[i].update({quantity },
										{
											where: {
												product_id: items[i].dataValues.product_id
											}

										})
									promises.push(newPromise) // <-------------- pushing
								}
							}
							if (!found) {
								console.log('in not found')
								var newPromise2 = CartItem.create({
									quantity: notLoggedIn.dataValues.quantity,
									price: notLoggedIn.dataValues.price,
									product_id: notLoggedIn.dataValues.product_id,
									order_id: req.params.orderId
								})
								//	.then(create => console.log(create, 'create'))
								promises.push(newPromise2) // <-------------- pushing
							}
						})

						return Promise.all(promises) // <-------------- returning promises

							.then(function (carts) {
								console.log(carts, 'carts', carts)

								CartItem.findAll({
									where: {
										order_id: orderId
									},
									include: [{ model: Product }]
								})

									.then(cartItems => {

										console.log(cartItems, ' ITEMSSSSS')
										res.send({ items: cartItems, product: [] })
									})


							})
						// 	sessionCartItems.forEach(notLoggedIn => {

						// 		 {
						// 			 loggedItems.Instance.dataValues
						// 		 }
						// console.log(elem, 'elem')}

					})

			})





		//var product_id = items[0].dataValues.product_id
		//		Product.findAll({})
		//.then(product => {

		//	})

	})
	// 		.catch(next)
	// })
	.put('/checkout/:orderId', (req, res, next) => {
		let orderId = req.params.orderId
		console.log(orderId, 'checkou!!!======>');
		Order.findById(orderId)
			.then(order => order.setStatus('sent'))
			.then(items => res.send(items))
			.catch(next)
	})
	// .post('/notlogged', (req, res) => {
	// 	console.log(' in not logged in', req.session.id, req.body)
	// 	NonLoggedCart.find({
	// 		where: {
	// 			sessionId: req.session.id,
	// 			product_id: req.body.productId
	// 		}
	// 	})
	// 		.then(session => {
	// 			if (!session) {
	// 				console.log('session does not exist')
	// 				return NonLoggedCart.create({

	// 					quantity: req.body.quantity,
	// 					price: req.body.price,
	// 					sessionId: req.session.id,
	// 					product_id: req.body.productId

	// 				})
	// 				// .then(cart => {
	// 				// 	res.send(cart)
	// 				// })
	// 			} else {
	// 				console.log(session, 'SESSION')


	// 				let price = (Number(session.price) + Number(Number(req.body.price))),
	// 					quantity = (Number(Number(req.body.quantity)) + Number(session.quantity))
	// 				console.log((Number(session.price) + Number(price)), (Number(quantity) + Number(session.quantity)), ' CHECKING session', req.body.price, session.price, req.body.quantity, session.quantity, session)

	// 				return session.update({ price: price, quantity: quantity },
	// 					{
	// 						where: {

	// 							product_id: req.body.productId,
	// 							sessionId: req.session.id
	// 						}
	// 					}
	// 				)
	// 					.then(updated => {
	// 						console.log(updated, 'UPDATED')
	// 						//	res.send(updated)

	// 					})
	// 			}

	// 		})
	// 		.then(() => {
	// 			return NonLoggedCart.findAll({
	// 				where: {
	// 					sessionId: req.session.id,

	// 				},
	// 				include: [Product]
	// 			})
	// 				.then(cart => res.send({ items: cart, product: [] }))
	// 		})
	// })


	// .get('/notlogged', (req, res) => {
	// 	console.log(' in not logged in', req.session.id, req.body)
	// 	NonLoggedCart.findAll({
	// 		where: {
	// 			sessionId: req.session.id
	// 		},
	// 		include: [Product]
	// 	})
	// 		.then(orders => res.send(orders))
	// 		.catch(err => console.log(err))
	// })
	// .delete('/notlogged', (req, res) => {
	// 	NonLoggedCart.destroy({
	// 		where: {
	// 			sessionId: req.session.id
	// 		}
	// 	})
	// 		.then(() => {
	// 			res.send(204)
	// 		})
	// 		.catch(err => console.log(err))
	// })
	 .put('/', (req, res, next) => {
			console.log(' in update', req.body)
				CartItem.find({
			where: {
				product_id : req.body.productId,
				order_id: req.body.orderId
			}
		})
		.then(cart =>{
			if (req.body.quantity === String(0)){
				cart.destroy()
				.then(() => res.send(204))
			}
			else
			{
				cart.update({quantity: req.body.quantity})
				.then(() => res.send(202))
			}
			})


	 })


	.delete('/delete/:id/:orderId', (req, res, next) => {
		console.log(req.body, 'req.body')
		CartItem.find({
			where: {
				product_id : req.params.id,
				order_id: req.params.orderId
			}
		})
		.then(cart => {
		//	console.log(cart)
			return cart.destroy()
		})
		.then(() => res.send(204))
		.catch(err => console.log(err))
	})



	// .delete('/delete/:id', (req, res, next) => {
	// 	console.log(req.body, 'req.body')
	// 	NonLoggedCart.find({
	// 		where: {
	// 			product_id : req.params.id,
	// 			sessionId: req.session.id
	// 		}
	// 	})
	// 	.then(cart => {
	// 	//	console.log(cart)
	// 		return cart.destroy()
	// 	})
	// 	.then(() => res.send(204))
	// 	.catch(err => console.log(err))
	// })


	// 	 .put('/notlogged', (req, res, next) => {
	// 		console.log(' in update', req.body)
	// 			NonLoggedCart.find({
	// 		where: {
	// 			product_id : req.body.productId,
	// 			sessionId: req.session.id
	// 		}
	// 	})
	// 	.then(cart =>{
	// 		if (req.body.quantity === String(0)){
	// 			cart.destroy()
	// 			.then(() => res.send(204))
	// 		}
	// 		else
	// 		{
	// 			cart.update({quantity: req.body.quantity})
	// 			.then(() => res.send(202))
	// 		}
	// 		})


	//  })