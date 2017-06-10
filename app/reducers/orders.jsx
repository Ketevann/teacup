import axios from 'axios'

const initialState = {userOrders: []}

/*************ACTIONS **********************/

const USER_ORDERS = 'USER_ORDERS'
export const userOrders = orders => ({
  type: USER_ORDERS, orders
})

/*************REDUCER **********************/
const orders = (state=initialState, action) => {
  switch (action.type) {
  case USER_ORDERS:
    state.userOrders = [...action.orders]
    break;
  }
  return state
}

export const loadOrders = () => dispatch => {
    axios.get('/api/orders/')
      .then(orders => { dispatch(userOrders(orders.data))})
      .catch(err => console.error)
};

export default orders

