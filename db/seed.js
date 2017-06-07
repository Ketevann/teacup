
const db = require('./index.js')
console.log('***********', db)
const Product = db.Product
const User = db.User
const Order = db.Order
const Payment = db.Payment
const Review = db.Review
const CartItem = db.CartItem
const Promise = require('bluebird');

//note: I'm just going to write associations in postico

const data = {

  products: [
    {name: 'Granola Foobar', price: 2.25, category: 'vegan'}, 
    {name: 'Almond Foobar', price: 2.75, category: 'unhealthy'}, 
    {name: 'Cinnamon Foobar', price: 3.00, category: 'kosher'},
  ],
  users: [
    {name: 'Claire', email: 'claire@gmail.com', password: 'password123'},
    {name: 'Ketti', email: 'ketti@gmail.com', password: '321password'},
  ],
  orders: [
    {status:'pending', Name: 'Linus', Street: '123 Grace Hopper Lane', Apartment: '5B',
  State:'Alaska', City:'Hopperville', zipCode: 10021},
      {status:'pending', Name: 'Liz', Street: '246 Grace Hopper Lane', Apartment: '8G',
  State:'Alaska', City:'Hopperville', zipCode: 10021},
  ],
  payments: [
    {vendor: 'Discover', ExpirationDate: 2020, Number: '12345678910111213', Name: 'Linus', Street: '123 Grace Hopper Boulevard', Apartment: '5B',
  State:'Alaska', City:'Hopperville', zipCode: 10021},
   {vendor: 'Discover', ExpirationDate: 2090, Number: '12345378920141213', Name: 'Ana', Street: '246 Luisa Lane', Apartment: 'ES6',
  State:'New York', City:'New York', zipCode: 10017},
  ],
  reviews: [
    {content: 'this foobar rules!', stars: 4},
    {content: 'this foobar SUCKS', stars: 1},
  ],
  cartItems: [
    {name: 'Cinnamon Foobar', Price: '3.00', quantity: 5},
    {name: 'Almond Foobar', Price: '2.75', quantity: 9},
  ],

}

db.sync({force: true})
.then(()=> {
    console.log('seeding the database')
    const creatingProducts = data.products.map(product => {
      Product.create(product)
    })
    const creatingUsers = data.users.map(user => {
      User.create(user)
    })
    const creatingOrders = data.orders.map(order => {
      Order.create(order)
    })
    const creatingPayments = data.payments.map(payment => {
      Payment.create(payment)
    })
    const creatingReviews = data.reviews.map(reviews => {
      Review.create(review)
    })
    const creatingCartItems = data.cartItems.map(cartItem => {
      CartItem.create(cartItem)
    
    return Promise.all([creatingProducts, creatingUsers, creatingOrders, creatingPayments, creatingReviews, creatingCartItems])
  })
  .then(() => console.log('created everything!'))
  .catch()

})
