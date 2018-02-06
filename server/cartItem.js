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
								// when product ids match - updates quantity
								if (items[i].dataValues.product_id ===
									notLoggedIn.dataValues.product_id
								) {
									found = true;
									let quantity = Number(items[i].dataValues.quantity) +
										Number(notLoggedIn.dataValues.quantity);

									var newPromise = items[i].update({quantity },
										{
											where: {
												product_id: items[i].dataValues.product_id
											}

										})
									promises.push(newPromise)
								}
							}
							if (!found) {
								var newPromise2 = CartItem.create({
									quantity: notLoggedIn.dataValues.quantity,
									price: notLoggedIn.dataValues.price,
									product_id: notLoggedIn.dataValues.product_id,
									order_id: req.params.orderId
								})
								promises.push(newPromise2)
							}
						})

						return Promise.all(promises)
							.then(function (carts) {
								console.log(carts, 'carts', carts)

								CartItem.findAll({
									where: {
										order_id: orderId
									},
									include: [{ model: Product }]
								})

									.then(cartItems => {

										res.send({ items: cartItems, product: [] })
									})

					})

			})



	})
	})
//update order status on checkout
	.put('/checkout/:orderId', (req, res, next) => {
		let orderId = req.params.orderId
		console.log(orderId, 'checkou!!!======>');
		Order.findById(orderId)
			.then(order => order.setStatus('sent'))
			.then(items => res.send(items))
			.catch(next)
	})

	//update cart item
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

	 //delete cart item
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

