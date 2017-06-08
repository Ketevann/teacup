const router = require('express').Router()
const Orders = require('../db/models/order') 


//add post when do oauth 
router.get('/cartItems/:orderId',function(req,res,next){
	CartItem.findAll({
		where: {order_Id : req.params.orderId},
	    include:[Products]
		})
	    .then((items)=>res.send(items))
	    .catch(next)


})
