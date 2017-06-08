const router = require('express').Router()
const Orders = require('../db/models/order')

router.get('/orders',function(req,res,next){
	Orders.findAll({})
	    .then((orders)=>{res.send(orders)})
		.catch(next)
})
router.get('/order/:orderId',function(req,res,next){
	Orders.findAll({
		where:{
			id: req.params.orderId
	    }
    })
    .then((orders)=>{res.send(orders)})
    .catch(next)
})
router.get('/order/:userId',function(req,res,next){
	Orders.findAll({
		where:{
			user_Id: req.params.userId
	    }
    })
    .then((orders)=>{res.send(orders)})
    .catch(next)
})
