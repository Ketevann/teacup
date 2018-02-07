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
      return axios.delete(`/api/notlogged/delete/${id}`, { id })
        .then(res => dispatch(remove(id)))
        .catch(err => console.log(err))
    }
    else {
      //if logged in remove an item from cart
      return axios.delete(`/api/cartitem/delete/${id}/${orderId}`, { id })
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
//add to cart
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
    axios.get('/api/auth/whoami')
      .then(user => {
        return axios.get(`/api/notlogged`)
          .then(notLoggedOrders => {
            if (user.data !== '' || user.data.length > 0) {
              let userId = user.data.id
              return axios.get(`/api/order/users/${userId}`)
                .then((order) => {
                  let orderId = order.data.id
                  if (!orderId && notLoggedOrders.data.items.length > 0) {
                    return axios.post(`/api/order/${userId}`)
                      .then(createdOrder => {
                        let orderId = createdOrder.data.id
                      })
                  }
                  else {
                    let orderId = order.data.id
                  }
                  return axios.get(`/api/cartitem/all/${orderId}`)
                    .then(cartItems => {
                      if (notLoggedOrders.data.items.length > 0) {
                        return axios.delete(`/api/notlogged`)
                          .then(() => console.log('deleted'))
                      }
                      return dispatch(getCart(cartItems.data))
                    })
                })

            }
            else { //if user is not logged in cart shows zero items
              return dispatch(getCart(notLoggedOrders.data))
            }
          })
      })
  }

//checkout
export const checkOut = (userId, dispatch) =>
  dispatch => {
    //get user orderid
    axios.get(`/api/order/users/${userId}`)
      .then(res => {
        let orderId = res.data.id
        //update order status
        axios.put(`/api/cartitem/checkout/${orderId}`)
      })
      .then(() => dispatch(checkoutCart()))
      .catch(console.error)
  }

export default reducer

