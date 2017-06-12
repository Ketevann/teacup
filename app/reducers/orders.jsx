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
    console.log('in USER_ORDERS')
    var orders = (Array.isArray(action.orders)) ? action.orders : [action.orders] 
    newstate.userOrders = orders
    console.log('NEWSTATE', newstate)
    return newstate
  default:
    return newstate
  }
  
}

export const loadOrders = () => dispatch => {
  console.log('GETTING INTO LOAD ORDERS')
  const gettingId =
  axios.get('/api/auth/whoami')
        .then(response => {
          console.log('THIS IS OUR RESPONSE', response)
          return response.data
        })
        .then(user => {
          console.log('USER IN LOAD ORDERS', user)
          return user.id
        })
        .catch(err => console.error(err))
  console.log('GETTING ID', gettingId)
  const gettingOrders = (userId) =>
  axios.get(`/api/orders/${userId}`)
      .then(orders => {
        console.log('THIS IS ORDERS', orders)
        console.log('THIS IS ORDERS data', orders.data)
        store.dispatch(userOrders(orders.data))
      })
      .catch(console.err)

  Promise.all([gettingId])
    .spread(function(userId) {
      console.log('THIS IS userId', userId)
      return gettingOrders(userId)
    })
    .catch(console.err)
}

export default orders

