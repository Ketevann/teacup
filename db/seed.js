'use strict'

const db = require('APP/db')
    , {User, Thing, Favorite, Promise, Product, Payment, Order, CartItem, Review} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
    orders: orders(),
    payment: payment(),
    review: review(),
    cartItem: cartItem(),
  }

  // seeded.favorites = favorites(seeded)

  //Promise.props:
  //Like .all but for object properties or Maps entries instead of iterated values.
  // Returns a promise that is fulfilled when all the properties of the object or the Map's values are fulfilled.
  return Promise.props(seeded)
}

const users = seed(User, {
  one: {name: 'Ketti', email: 'ketti@gmail.com', role: 'user', password: '321password'},
 two: {name: 'Claire', email: 'claire@gmail.com', role: 'admin', password: 'password123'},

})

const products = seed(Product, {
  one: {name: 'Jasmine Tea', price: 2.25, img:'https://www.organicfacts.net/wp-content/uploads/2013/06/Jasmine-tea.jpg', categories: 'jasmine tea'},

  two:  {name: 'Black Tea', price: 2.75, img:'http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAFV_PRD/on/demandware.static/-/Sites-Teavana_Master_Catalog/default/dw58701317/images/Product%20Images/Tea/32258_earlgreytea_Hol16.jpg?sw=1000&sh=1000', categories: 'black tea'},

  three:  {name: 'Earl Gray Tea', price: 3.00, img:'http://silkroadteastore.com/shop/images/product/i/imperial-earl-grey-black-tea-512px-512px.jpg', categories: 'earl gray tea'},

  four: {name: 'Peppermint Tea', price: 2.25, img:'http://www.teapeople.co.uk/media/catalog/product/cache/1/image/aca7c15394bfd51561ecb1df063b923e/p/e/peppermint.jpg', categories: 'peppermint tea'},

  five:  {name: 'Apple Tea', price: 2.75, img:'https://bluebirdteaco.com/media/catalog/product/cache/1//a/n/ankara-apple_1_2.png/9df78eab33525d08d6e5fb8d27136e95/a/n/ankara_apple.png', categories: 'apple tea'},

  six:  {name: 'Rose Tea', price: 3.00, img:'http://demandware.edgesuite.net/sits_pod26/dw/image/v2/AAFV_PRD/on/demandware.static/-/Sites-Teavana_Master_Catalog/default/dw23bd32b2/images/Product%20Images/Tea/Green%20Tea/31355_sakuraallurertea.jpg?sw=450&sh=450', categories: 'rose tea'}
})

const orders = seed(Order, {
  one: {status:'pending', Name: 'Linus', Street: '123 Grace Hopper Lane', Apartment: '5B',
  State:'Alaska', City:'Hopperville', zipCode: 10021, userId: 1},
  two: {status:'pending', Name: 'Liz', Street: '246 Grace Hopper Lane', Apartment: '8G',
  State:'Alaska', City:'Hopperville', zipCode: 10021, userId: 1}
})

const payment = seed(Payment, {
  one: {CCV: 123, vendor: 'Discover', ExpirationDate: 2020, Number: '1111111111111', Name: 'Linus', Street: '123 Grace Hopper Boulevard', Apartment: '5B',
  State:'Alaska', City:'Hopperville', zipCode: 10021},
  two: {CCV: 123, vendor: 'Discover', ExpirationDate: 2090, Number: '2222222222222', Name: 'Ana', Street: '246 Luisa Lane', Apartment: 'ES6',
  State:'New York', City:'New York', zipCode: 10017},
})

const review = seed(Review, {
    good: {content: 'this tea is great!', stars: 4, userId: 1},
    bad: {content: 'mmmm', stars: 5, userId: 1},
})

const cartItem = seed(CartItem, {
    one: {name: 'Jasmine', price: '2.25', product_id: 1, order_id: 1, quantity: 5},
    two: {name: 'Apple Tea', price: '2.25', product_id: 2, order_id: 2, quantity: 9},
})



if (module === require.main) {
  db.didSync
    .then(() => db.sync({}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users})
