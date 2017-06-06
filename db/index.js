
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const Payment = require('../models/payment');
const Review = require('../models/review');
const CartItem = require('../models/cartitem');

User.hasMany(Order);
//user.getOrder user.setOrder -- JOIN TABLE!

Order.belongsTo(User);
//order.getUser order.setUser -- order gets userId

Order.belongsTo(Payment);
//order.getPayment order.setPayment -- order gets paymentId

Review.belongsTo(Product);
//review.getProduct review.setProduct -- review gets productId

Review.belongsTo(User);
//review.getUser review.setUser -- review gets userId

Order.belongsToMany(Product, {through: CartItem})
//CartItem is the join table.

Product.belongstoMany(Order, {through: CartItem})
//CartItem is the join table.

module.exports = {Product, User, Order, Payment, Review, CartItem}