const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const Order = db.model('order')
const Promise = require('bluebird')

module.exports = require('express').Router()
	.post('/', (req,res,next) => {
		let price = req.body.price
		let product_id = req.body.productId
		// let order_id = req.body.orderId
		let quantity = req.body.quantity

		let newCartItem = {price: price, product_id: product_id, order_id: 2, quantity: quantity}
		CartItem.create(newCartItem)
		.then(item => res.send(item))
		.catch(next)

	})
	.get('/all/:orderId', (req,res,next) => {
		let orderId = req.params.orderId
		CartItem.findAll({where: {
			order_id: orderId
		}})
			.then(items =>{
				var product_id = items[0].dataValues.product_id
				console.log(items[0].dataValues.product_id, 'tpce', items)
				Product.findAll({})
				.then(product =>{


					console.log(product)

		 res.send({items: items, product:product})
		 				})

	})
		.catch(next)
	})
	.put('/checkout/:orderId', (req,res,next) => {
		let orderId = req.params.orderId
		Order.findById(orderId)
		.then(order => order.setStatus('sent'))
		.then(items => res.send(items))
		.catch(next)
	})
