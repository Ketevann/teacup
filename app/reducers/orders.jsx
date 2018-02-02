import axios from 'axios'
import Promise from 'bluebird'
import store from '../store'

const initialState = { userOrders: [], singleOrders: [] }

/** *********** ACTIONS **********************/

const USER_ORDERS = 'USER_ORDERS'
export const userOrders = orders => {
  console.log(' hereee')
  return { type: USER_ORDERS, orders }
}

const SINGLE_ORDERS = 'SINGLE_ORDERS'
export const singleOrder = singleOrders => ({
  type: SINGLE_ORDERS, singleOrders
})

/**  *********** REDUCER **********************/
const orders = (state = initialState, action) => {
  var newstate = Object.assign({}, state)
  switch (action.type) {
    case USER_ORDERS:
      var orders = (Array.isArray(action.orders)) ? action.orders : [action.orders]
      newstate.userOrders = orders
      return { ...newstate, userOrders: orders }
    case SEARCH:
      return { listnames: true, names: action.names }
    case CANCEL:
      return { listnames: false }
    default:
      return newstate
  }
}
const SEARCH = 'SEARCH'
const CANCEL = 'CANCEL'
export const searchProduct = (names) => ({ type: SEARCH, names })
export const cancelSearch = () => ({ type: CANCEL })
export const loadAllOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(orders => {
      dispatch(userOrders(orders.data))
    })
}
export const loadOrders = dispatch =>
  dispatch =>{

    //dispatch =>
  console.log('LOAD PRDERS')
    return axios.get('/api/auth/whoami')
      .then(response => {
        console.log('response', response)
        // return response.data
        // })
        // .then(user => {
        const userId = response.data.id
        console.log('userID in ordrs =============',userId )
        if(userId){
        return axios.get(`/api/orders/user/${userId}`)

      .then(orders => {
        console.log('orders', orders)
        dispatch(userOrders(orders.data))
      })
      .catch(console.error)
    }
    })

      //   Promise.all([gettingId])
      //     .spread(function (userId) {
      //       return dispatch(gettingOrders(userId))
      //     })


 }
//}
export default orders

