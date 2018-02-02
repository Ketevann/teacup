import axios from 'axios'
import { whoami } from './auth'
const initialState = { items: [], product: [] }


const reducer = (state = initialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case ADD_CARTITEM:
      console.log('in cartitem reducer', action)
      return { ...state, items: action.items, product: [action.product] }
    case GET_CART:
      console.log(action.cartItems)
      return { ...state, items: action.cartItems.items }
    case CART_TOTAL:
      return nextState.total = action.total
    case CHECKOUT_ORDER:
      return nextState.cart = []
    case DELETE:
      let filteredItems = nextState.items.filter(elements => {
        if (action.id !== elements.product_id) return elements
      })
      return { ...state, items: filteredItems }
    case UPDATEITEM:
      let updatedProduct = nextState.items.filter(elements => {
        if (action.id === elements.product_id) {
          elements.quantity = action.quantity
        }
        if (elements.quantity !== 0 && elements.quantity !== '0') {
          console.log(elements, ' not zero')
          return elements
        }
        else {
          console.log(elements, ' is zero')
        }
      })
      return { ...state, items: updatedProduct }
    default:
      return state
  }
}

const ADD_CARTITEM = 'ADD_CARTITEM'

export const newCartItem = ({ items, product }) => {
  return { type: ADD_CARTITEM, items, product }
}

const GET_CART = 'GET_CART'

export const getCart = (cartItems) => {
  console.log('in cart action creater', cartItems)
  return { type: GET_CART, cartItems }

}

const CART_TOTAL = 'CART_TOTAL'

export const cartTotal = (total) => ({
  type: CART_TOTAL, total
})

const CHECKOUT_ORDER = 'CHECKOUT_ORDER'

export const checkoutCart = () => ({
  type: CHECKOUT_ORDER
})

const DELETE = 'DELETE'

export const remove = (id) => ({
  type: DELETE,
  id
})
export const removeProduct = (id, orderId, dispatch) =>
  dispatch => {
    console.log(id, 'delete id', orderId);
    if (!orderId) {
      return axios.delete(`/api/notlogged/delete/${id}`, { id })
        .then(res => dispatch(remove(id)))
        .catch(err => console.log(err))
    }
    else {
      return axios.delete(`/api/cartitem/delete/${id}/${orderId}`, { id })
        .then(res => dispatch(remove(id)))
        .catch(err => console.log(err))
    }
  }

const UPDATEITEM = 'UPDATEITEM'

export const update = (id, quantity) => ({
  type: UPDATEITEM,
  id,
  quantity
})
export const updateProduct = (quantity, productId, orderId, dispatch) =>
  dispatch => {
    console.log(productId, orderId, ' SEEEE')
    if (!orderId) {
      return axios.put('/api/notlogged', { quantity, productId })
        .then(res => dispatch(update(productId, quantity)))
        .catch(err => console.log(err))
    }
    else {
      return axios.put('/api/cartitem', { quantity, productId, orderId })
        .then(res => dispatch(update(productId, quantity)))
        .catch(err => console.log(err))
    }
  }

export const addToCart = (itemInfo, dispatch) =>
  dispatch => {
    return axios.post('/api/cartitem/', itemInfo)
      .then(item => {
        console.log(item, 'got back')
        return dispatch(newCartItem(item.data))
          .catch(console.error)
      })

  }

export const getOrMakeOrder = (itemInfo, dispatch) =>
  dispatch => {
    console.log('in get OrderOrooror')
    let userId = itemInfo.userId
    if (userId !== undefined) {
      axios.get(`/api/order/users/${userId}`)
        .then(order => {
          console.log('returned order', order)
          if (!order.data) {
            axios.post(`/api/order/${userId}`, itemInfo)
              .then(savedOrder => {
                console.log(savedOrder, 'saved Order')
                itemInfo.orderId = savedOrder.data.id
                return axios.post('/api/cartitem/', itemInfo)
                  .then(item => {
                    console.log(item, 'got back')
                    return dispatch(newCartItem(item.data))
                  })
                  .catch(console.error)

              });
          }

          else {
            itemInfo.orderId = order.data.id
            console.log(itemInfo, ' OGOGOGOGOOG', order)
            return axios.post('/api/cartitem/', itemInfo)
              .then(item => {
                console.log(item, 'got back')
                return dispatch(newCartItem(item.data))
              })
              .catch(console.error)
          }
        })
      //   console.log(itemInfo, ' OGOGOGOGOOG', order)
      //   return axios.post('/api/cartitem/', itemInfo)
      // })
      // .then(item => {
      //   console.log(item, 'got back')
      //   return dispatch(newCartItem(item.data))
      // })
      // .catch(console.error)
    } else {
      return axios.post('/api/notlogged', itemInfo)
        .then(res => {
          console.log(res, 'not logged in data');
          return dispatch(newCartItem(res.data))
        })
        .catch(err => console.log(err))
    }
  }


export const loadCartItems = () =>
  dispatch => {
    console.log('load car titem')
    axios.get('/api/auth/whoami')
      .then(user => {


        console.log(user, 'user ===============>')
        if (user.data !== '' || user.data.length > 0) {
          console.log(user, 'user =============^^^^^')
          let userId = user.data.id
          console.log(user, ' USER ID IN LOADCART')
          return axios.get(`/api/notlogged`)
            .then(notLoggedOrders => {

              console.log('not logged int ordes', notLoggedOrders);

              return axios.get(`/api/order/users/${userId}`)


                .then((order) => {
                  console.log('items!!!', order)
                  let orderId = order.data.id
                  console.log('items333!!!', orderId, notLoggedOrders.data, '****', !orderId, notLoggedOrders.data.length < 1)
                  if (!orderId && notLoggedOrders.data.length > 0) {
                    console.log(' no orders ')
                    return axios.post(`/api/order/${userId}`)
                      .then(createdOrder => {
                        console.log(createdOrder, 'CREATED ORDER')
                        let orderId = createdOrder.data.id
                        return axios.get(`/api/cartitem/all/${orderId}`)

                          .then(cartItems => {
                            console.log(cartItems, 'cartItems')
                            return dispatch(getCart(cartItems.data))
                          })

                      })

                  }


                  else {
                    console.log('in elesee CARTTT')
                    let orderId = order.data.id
                    return axios.get(`/api/cartitem/all/${orderId}`)

                      .then(cartItems => {
                        console.log(cartItems, 'cartItems')
                        return dispatch(getCart(cartItems.data))
                      })
                  }
                  //  return items.data
                })
            })
            .catch(console.error)

        }
        else {
          //if user is not logged in cart shows zero items
          return axios.get(`/api/notlogged`, user)
            .then(cartitems => {
              console.log(cartitems, 'NOOOOOOOOT');
              return dispatch(getCart(cartitems.data))
            })

        }

      })
  }

export const checkOut = (userId, dispatch) =>
  dispatch => {
    console.log(userId, ' user IDDDDDDD')
    axios.get(`/api/order/users/${userId}`)
      .then(res => {
        let orderId = res.data.id
        console.log(res, 'checkout order')
        axios.put(`/api/cartitem/checkout/${orderId}`)
      })
      .then(() => dispatch(checkoutCart()))
      .catch(console.error)
  }

export default reducer



/*
what i wanted to do to find or create a new pending order
lol :(

//first...
export const getUserIdThenCart = () =>

  dispatch => {
    axios.get('/api/auth/whoami')
      .then(who => {
        const user = who.data
        dispatch(getOrMakeLoader(user))
      })
      .catch(console.error)}



//then...
export const getOrMakeLoader = (user) =>
  dispatch => {
    let userId = user.id
    axios.get(`/api/order/${userId}`)
      .then(order => dispatch(loadCartItems(order)))
      .catch(console.error)
  }


//finally...
export const loadCartItems = (order) =>
    dispatch => {
      let orderId = order.data[0].id
      axios.get(`/api/cartitem/all/${orderId}`)
        .then((items) => {
          dispatch(getCart(items.data))
          return items.data})
        .catch(console.error)}

*/

