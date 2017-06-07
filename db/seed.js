

const db = require('./index');
const models = require('./models/index')(db);

const Product = models.Product
const User = models.User
const Order = models.Order
const Payment = models.Payment
const Review = models.Review
const CartItem = models.CartItem
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
    {CCV: 123, vendor: 'Discover', ExpirationDate: 2020, Number: 12345678910111213, Name: 'Linus', Street: '123 Grace Hopper Boulevard', Apartment: '5B',
  State:'Alaska', City:'Hopperville', zipCode: 10021, order_id:1},
   {CCV: 123, vendor: 'Discover', ExpirationDate: 2090, Number: 12345378920141213, Name: 'Ana', Street: '246 Luisa Lane', Apartment: 'ES6',
  State:'New York', City:'New York', zipCode: 10017, order_id:1},
  ],
  reviews: [
    {content: 'this foobar rules!', stars: 4},
    {content: 'this foobar SUCKS', stars: 1},
  ],
  cartItems: [
    {name: 'Cinnamon Foobar', Price: '3.00', product_id:1, order_id:1, quantity: 5},
    {name: 'Almond Foobar', Price: '2.75', product_id:1, order_id:1, quantity: 9},
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
    const creatingReviews = data.reviews.map(review => {
      Review.create(review)
    })
    const creatingCartItems = data.cartItems.map(cartItem => {
      CartItem.create(cartItem)
    })

    
    return Promise.all([creatingProducts, creatingUsers, creatingOrders, creatingPayments, creatingReviews, creatingCartItems])
  })
  .then(() => console.log('created everything!'))
  .catch(err => console.log(err.stack))


// // const db = require('./index');
// // const models = require('./models/index')(db);

// // const Product = models.Product
// // const User = models.User
// // const Order = models.Order
// // const Payment = models.Payment
// // const Review = models.Review
// // const CartItem = models.CartItem
// // const Promise = require('bluebird');



// // //note: I'm just going to write associations in postico

// // const data = {

// //   products: [
// //     {name: 'Granola Foobar', price: 2.25, category: 'vegan'}, 
// //     {name: 'Almond Foobar', price: 2.75, category: 'unhealthy'}, 
// //     {name: 'Cinnamon Foobar', price: 3.00, category: 'kosher'},
// //   ],
// //   users: [
// //     {name: 'Claire', email: 'claire@gmail.com', password: 'password123'},
// //     {name: 'Ketti', email: 'ketti@gmail.com', password: '321password'},
// //   ],
// //   orders: [
// //     {status:'pending', Name: 'Linus', Street: '123 Grace Hopper Lane', Apartment: '5B',
// //   State:'Alaska', City:'Hopperville', zipCode: 10021},
// //       {status:'pending', Name: 'Liz', Street: '246 Grace Hopper Lane', Apartment: '8G',
// //   State:'Alaska', City:'Hopperville', zipCode: 10021},
// //   ],
// //   payments: [
// //     {vendor: 'Discover', ExpirationDate: 2020, Number: '12345678910111213', Name: 'Linus', Street: '123 Grace Hopper Boulevard', Apartment: '5B',
// //   State:'Alaska', City:'Hopperville', zipCode: 10021},
// //    {vendor: 'Discover', ExpirationDate: 2090, Number: '12345378920141213', Name: 'Ana', Street: '246 Luisa Lane', Apartment: 'ES6',
// //   State:'New York', City:'New York', zipCode: 10017},
// //   ],
// //   reviews: [
// //     {content: 'this foobar rules!', stars: 4},
// //     {content: 'this foobar SUCKS', stars: 1},
// //   ],
// //   cartItems: [
// //     {name: 'Cinnamon Foobar', Price: '3.00', quantity: 5},
// //     {name: 'Almond Foobar', Price: '2.75', quantity: 9},
// //   ],

// // }

// // db.sync({force: true})
// // .then(()=> {
// //     console.log('seeding the database')
// //     const creatingProducts = data.products.map(product => {
// //       Product.create(product)
// //     })
// //     const creatingUsers = data.users.map(user => {
// //       User.create(user)
// //     })
// //     const creatingOrders = data.orders.map(order => {
// //       Order.create(order)
// //     })
// //     const creatingPayments = data.payments.map(payment => {
// //       Payment.create(payment)
// //     })
// //     const creatingReviews = data.reviews.map(reviews => {
// //       Review.create(review)
// //     })
// //     const creatingCartItems = data.cartItems.map(cartItem => {
// //       CartItem.create(cartItem)
    
// //     return Promise.all([creatingProducts, creatingUsers, creatingOrders, creatingPayments, creatingReviews, creatingCartItems])
// //   })
// //   .then(() => console.log('created everything!'))
// //   .catch()

// // })
// 'use strict'

// const db = require('APP/db')
//     , {User, Thing, Favorite, Promise} = db
//     , {mapValues} = require('lodash')

// function seedEverything() {
//   const seeded = {
//     users: users(),
//     things: things(),
//   }

//   seeded.favorites = favorites(seeded)

//   return Promise.props(seeded)
// }

// const users = seed(User, {
//   god: {
//     email: 'god@example.com',
//     name: 'So many names',
//     password: '1234',
//   },
//   barack: {
//     name: 'Barack Obama',
//     email: 'barack@example.gov',
//     password: '1234'
//   },
// })

// // const things = seed(Thing, {
// //   surfing: {name: 'surfing'},
// //   smiting: {name: 'smiting'},
// //   puppies: {name: 'puppies'},
// // })

// // const favorites = seed(Favorite,
// //   // We're specifying a function here, rather than just a rows object.
// //   // Using a function lets us receive the previously-seeded rows (the seed
// //   // function does this wiring for us).
// //   //
// //   // This lets us reference previously-created rows in order to create the join
// //   // rows. We can reference them by the names we used above (which is why we used
// //   // Objects above, rather than just arrays).
// //   ({users, things}) => ({
// //     // The easiest way to seed associations seems to be to just create rows
// //     // in the join table.
// //     'obama loves surfing': {
// //       user_id: users.barack.id,    // users.barack is an instance of the User model
// //                                    // that we created in the user seed above.
// //                                    // The seed function wires the promises so that it'll
// //                                    // have been created already.
// //       thing_id: things.surfing.id  // Same thing for things.
// //     },
// //     'god is into smiting': {
// //       user_id: users.god.id,
// //       thing_id: things.smiting.id
// //     },
// //     'obama loves puppies': {
// //       user_id: users.barack.id,
// //       thing_id: things.puppies.id
// //     },
// //     'god loves puppies': {
// //       user_id: users.god.id,
// //       thing_id: things.puppies.id
// //     },
// //   })
// // )

// if (module === require.main) {
//   db.didSync
//     .then(() => db.sync({force: true}))
//     .then(seedEverything)
//     .finally(() => process.exit(0))
// }

// class BadRow extends Error {
//   constructor(key, row, error) {
//     super(error)
//     this.cause = error
//     this.row = row
//     this.key = key
//   }

//   toString() {
//     return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
//   }
// }

// // seed(Model: Sequelize.Model, rows: Function|Object) ->
// //   (others?: {...Function|Object}) -> Promise<Seeded>
// //
// // Takes a model and either an Object describing rows to insert,
// // or a function that when called, returns rows to insert. returns
// // a function that will seed the DB when called and resolve with
// // a Promise of the object of all seeded rows.
// //
// // The function form can be used to initialize rows that reference
// // other models.
// function seed(Model, rows) {
//   return (others={}) => {
//     if (typeof rows === 'function') {
//       rows = Promise.props(
//         mapValues(others,
//           other =>
//             // Is other a function? If so, call it. Otherwise, leave it alone.
//             typeof other === 'function' ? other() : other)
//       ).then(rows)
//     }

//     return Promise.resolve(rows)
//       .then(rows => Promise.props(
//         Object.keys(rows)
//           .map(key => {
//             const row = rows[key]
//             return {
//               key,
//               value: Promise.props(row)
//                 .then(row => Model.create(row)
//                   .catch(error => { throw new BadRow(key, row, error) })
//                 )
//             }
//           }).reduce(
//             (all, one) => Object.assign({}, all, {[one.key]: one.value}),
//             {}
//           )
//         )
//       )
//       .then(seeded => {
//         console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
//         return seeded
//       }).catch(error => {
//         console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
//       })
//   }
// }

// module.exports = Object.assign(seed, {users})
