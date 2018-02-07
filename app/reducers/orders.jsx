import axios from 'axios'
import Promise from 'bluebird'
import store from '../store'

const initialState = { userOrders: [], singleOrders: [], allOrders: [] }



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
    case GET_ALL_ORDERS:
      return { ...newstate, allOrders: action.orders }
    default:
      return newstate
  }
}



/** *********** ACTIONS **********************/

const USER_ORDERS = 'USER_ORDERS'

export const userOrders = (orders) => {
  return { type: USER_ORDERS, orders }
}

const SINGLE_ORDERS = 'SINGLE_ORDERS'
export const singleOrder = singleOrders => ({
  type: SINGLE_ORDERS, singleOrders
})
const SEARCH = 'SEARCH'

export const searchProduct = (names) => ({ type: SEARCH, names })

const CANCEL = 'CANCEL'
export const cancelSearch = () => ({ type: CANCEL })

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

export const alluserOrders = orders => {
  return { type: GET_ALL_ORDERS, orders }
}

export const loadAllOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(orders => {
      dispatch(alluserOrders(orders.data))
    })
}
export const loadOrders = dispatch =>
  dispatch => {
    return axios.get('/api/auth/whoami')
      .then(response => {
        const userId = response.data.id
        if (userId) {
          return axios.get(`/api/orders/user/${userId}`)
            .then(orders => {
              var newObj = orders.data.orders;
              for (var i = 0; i < newObj.length; i++) {
                newObj[i].cart = orders.data.cart[i]
              }
              dispatch(userOrders(newObj))
            })
            .catch(console.error)
        }
      })
  }

export default orders

