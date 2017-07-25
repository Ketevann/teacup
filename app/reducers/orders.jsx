import axios from 'axios'
import Promise from 'bluebird'
import store from '../store'

const initialState = {userOrders: [], singleOrders: []}

/** *********** ACTIONS **********************/

const USER_ORDERS = 'USER_ORDERS'
export const userOrders = orders => ({
  type: USER_ORDERS, orders
})

const SINGLE_ORDERS = 'SINGLE_ORDERS'
export const singleOrder = singleOrders => ({
  type: SINGLE_ORDERS, singleOrders
})

/**  *********** REDUCER **********************/
const orders = (state=initialState, action) => {
  var newstate = Object.assign({}, state)
  switch (action.type) {
  case USER_ORDERS:
    var orders = (Array.isArray(action.orders)) ? action.orders : [action.orders]
    newstate.userOrders = orders
    return newstate
  default:
    return newstate
  }
}
export const loadAllOrders = () => dispatch => {
  axios.get('/api/orders')
        .then(orders => {
          dispatch(userOrders(orders.data))
        })
}
export const loadOrders = () => dispatch => {
  const gettingId =
  axios.get('/api/auth/whoami')
        .then(response => {
          return response.data
        })
        .then(user => {
          return user.id
        })
        .catch(err => console.error(err))
  const gettingOrders = (userId) => dispatch =>
  axios.get(`/api/orders/user/${userId}`)
      .then(orders => {
        dispatch(userOrders(orders.data))
      })
      .catch(console.error)

  Promise.all([gettingId])
    .spread(function(userId) {
      return dispatch(gettingOrders(userId))
    })
    .catch(console.error)
}

export default orders

