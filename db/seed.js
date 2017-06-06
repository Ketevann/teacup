const db = require('./index.js');
const Product = db.Product;
const User = db.User;
const Order = db.Order;
const Payment = db.Payment;
const Review = db.Review;
const CartItem = db.CartItem;

const data = {

  products: [
    {name: 'Granola Foobar', price: 2.25, category: 'vegan'}, 
    {name: 'Almond Foobar', price: 2.75, category: 'unhealthy'}, 
    {name: 'Cinnamon Foobar', price: 3.00, category: 'kosher'}
  ],
  users: [
    {name: 'Claire', email: 'claire@gmail.com', password: 'password123'}
  ]


}