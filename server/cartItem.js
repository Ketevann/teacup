const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const Order = db.model('order')
const Promise = require('bluebird')

module.exports = require('express').Router()
	.post('/', (req,res,next) => {
		// let price = req.body.price
		// let product_id = req.body.productId
		// let order_id = req.body.orderId
		// let quantity = req.body.quantity
		//let newCartItem = {price: price, product_id: product_id, order_id: order_id, quantity: quantity}
		
		
		let newCartItem = {price: 3, product_id: 2, order_id: 2, quantity: 8}
		CartItem.create(newCartItem)
		.then(item => res.send(item))
		.catch(next)

	})




		//// GRAVEYARD OF CONVOLUTED SOLUTIONS R.I.P.://////


		// const findingOrder = (productCartItem) => Order.findOne({where:{ id: 1}})
		// 	.then(order => order.createCartItem(productCartItem))
		// 	.catch(next)
		
		// const findingProduct = Product.findOne({where: {
		// 	id: 1}})
		// 	.then(foundProduct => foundProduct)
		// 	.catch(next)

		// // const productCreateCartItem = (prod, orderCartItem) => prod.createCartItem(orderCartItem)
		// // 	.catch(next) 
		
		// Promise.all([findingProduct])
		// 	.then(product => product.map(r => r.data))
		// 	.then(product => findingOrder(product[0]))
		// 	// .then(Promise.all([findingProduct, findingOrder])
		// 	// 	.spread((foundProduct, foundOrder) => productCreateCartItem(foundProduct, foundOrder)
		// 	// ))
		// 	.catch(next)

//.then(order => order.createCartItem(productCartItem[0]))
		


		// CartItem.create({
		// 	quantity: 6, product_id: 6, order_id: 6
		// })
		// .then(newCartItem => res.send(newCartItem))
		// .catch(next)