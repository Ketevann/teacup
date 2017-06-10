import axios from 'axios'

const initialState = {orders: []}

/*************ACTIONS **********************/

const USER_ORDERS = 'USER_ORDERS'

/*************ACTION CREATORS **********************/

const userOrders = (orders) => ({type: USER_ORDERS, orders})

/*************REDUCER **********************/

const reducer = (state=initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
  case USER_ORDERS:
    [...newState.orders, action.orders]
  }
  return state
}




/************* DISPATCHER ************** *********/



export const getOrders = (userId) =>
  dispatch =>
  axios.get(`/api/order/${userId}`)
  .then(orders => dispatch(userOrders(orders)))
  .catch(err => console.error)


export default reducer
