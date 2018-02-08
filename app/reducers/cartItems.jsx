import axios from 'axios'
import { whoami } from './auth'
const initialState = { items: [], product: [] }


const reducer = (state = initialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case ADD_CARTITEM:
      return { ...state, items: action.items, product: [action.product] }
    case GET_CART:
      return { ...state, items: action.cartItems.items }
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
          return elements
        }
      })
      return { ...state, items: updatedProduct }
    default:
      return state
  }
}

//add item to cart
const ADD_CARTITEM = 'ADD_CARTITEM'

export const newCartItem = ({ items, product }) => {
  return { type: ADD_CARTITEM, items, product }
}

//get cart items
const GET_CART = 'GET_CART'

export const getCart = (cartItems) => {
  return { type: GET_CART, cartItems }

}

//checkout
const CHECKOUT_ORDER = 'CHECKOUT_ORDER'

export const checkoutCart = () => ({
  type: CHECKOUT_ORDER
})

//delete cart item
const DELETE = 'DELETE'

export const remove = (id) => ({
  type: DELETE,
  id
})

//remove product from cart
export const removeProduct = (id, orderId, dispatch) =>
  dispatch => {
    if (!orderId) {
      //if not logged in remove an item from not logged cart
      return axios.delete(`/api/notlogged/delete/${id}`)
        .then(res => dispatch(remove(id)))
        .catch(err => console.log(err))
    }
    else {
      //if logged in remove an item from cart
      return axios.delete(`/api/cartitem/delete/${id}/${orderId}`)
        .then(res => dispatch(remove(id)))
        .catch(err => console.log(err))
    }
  }

//upde cart
const UPDATEITEM = 'UPDATEITEM'

export const update = (id, quantity) => ({
  type: UPDATEITEM,
  id,
  quantity
})

export const updateProduct = (quantity, productId, orderId, dispatch) =>
  dispatch => {
    if (!Number.isInteger(Number(quantity))) return null
    if (!orderId) {
      //if not logged in update an item in not logged cart
      return axios.put('/api/notlogged', { quantity, productId })
        .then(res => dispatch(update(productId, quantity)))
        .catch(err => console.log(err))
    }
    else {
      //if  logged in update an item in cart
      return axios.put('/api/cartitem', { quantity, productId, orderId })
        .then(res => dispatch(update(productId, quantity)))
        .catch(err => console.log(err))
    }
  }

const postToCart = (itemInfo, dispatch) => {
  console.log('post to cart')
  return axios.post('/api/cartitem', itemInfo)
    .then(item => {
      console.log(item, ' in post cart')
      if (item.data.items.length > 0)
        return dispatch(newCartItem(item.data))
      else {
        return axios.put('/api/cartitem/update', itemInfo)
          .then(updateditem => {
            console.log(updateditem, ' in post update cart')
            return dispatch(newCartItem(updateditem.data))
          })
      }
    })
    .catch(console.error)
}

export const getOrMakeOrder = (itemInfo, dispatch) =>
  dispatch => {
    const { quantity } = itemInfo
    // if item quantity not a number return null
    if (!Number.isInteger(Number(quantity))) return null
    const userId = itemInfo.userId
    //if user logged in get user's order number
    if (userId !== undefined) {
      axios.get(`/api/order/users/${userId}`)
        .then(order => {
          if (!order.data) {
            //if order number does not exist create a new order number
            axios.post(`/api/order/${userId}`, itemInfo)
              .then(savedOrder => {
                itemInfo.orderId = savedOrder.data.id
                //post items to cart
                postToCart(itemInfo, dispatch)

              })
          } else {
            //if order number exists, post to cart
            itemInfo.orderId = order.data.id
            postToCart(itemInfo, dispatch)
          }

        })
    } else {
      // if user is not logged in post to non logged cart
      return axios.post('/api/notlogged', itemInfo)
        .then(res => {
          return dispatch(newCartItem(res.data))
        })
        .catch(err => console.log(err))
    }
  }

//get items from cart
const getCartItems = (orderId, dispatch) => {
  return axios.get(`/api/cartitem/all/${orderId}`)
    .then(cartItems => {
      console.log('getti cart items', cartItems)
      return dispatch(getCart(cartItems.data))
    })
}

//load cart items
export const loadCartItems = () =>
  dispatch => {
    //get user
    axios.get('/api/auth/whoami')
      .then(user => {
        //get non logged cart items
        return axios.get(`/api/notlogged`)
          .then(notLoggedOrders => {
            //if user is logged in and non logged cart not empty, get user's order numeber
            if (user.data !== '' || user.data.length > 0) {
              let userId = user.data.id
              return axios.get(`/api/order/users/${userId}`)
                .then((order) => {
                  let orderId = order.data.id
                  //delete items in non loggged cart
                  if (notLoggedOrders.data.items.length > 0) {
                    axios.delete(`/api/notlogged`)
                      .then(() => console.log('deleted'))
                  }
                  //if order does not exist and non logged cart not empty, create a new order number
                  if (!orderId && notLoggedOrders.data.items.length > 0) {
                    return axios.post(`/api/order/${userId}`)
                      .then(createdOrder => {
                        let orderId = createdOrder.data.id
                        //get cart items
                        getCartItems(orderId, dispatch)
                      })
                  }
                  else if (!orderId && notLoggedOrders.data.items.length === 0) {
                    //if order does not exist and non logged cart empty, return an empty cart
                    return dispatch(getCart({ items: [] }))
                  }
                  else {
                    //if order exists loads cart items
                    console.log(orderId, notLoggedOrders)
                    orderId = order.data.id
                    getCartItems(orderId, dispatch)
                  }

                })

            }
            else { //if user is not logged in cart items
              return dispatch(getCart(notLoggedOrders.data))
            }
          })
      })
  }

//checkout
export const checkOut = (userId, items, dispatch) =>
  dispatch => {
    //get user orderid
    axios.get(`/api/order/users/${userId}`)
      .then(res => {
        let orderId = res.data.id
        //update order status
        axios.put(`/api/cartitem/checkout/${orderId}`)
      })
      .then(() => {
        let promise = []
        items.forEach(elem => {
          promise.push(axios.put(`/api/products/quantity/${elem.product.id}`, { quantity: elem.quantity }))
        })
        axios.all([promise])
          .then(() => dispatch(checkoutCart()))
          .catch(console.error)
      })

  }

export default reducer

