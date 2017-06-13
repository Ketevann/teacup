import axios from 'axios'
import Bluebird from 'bluebird'


const initialState = {currentOrder: {}, cart: []}
const reducer = (state=initialState, action) => {
console.log('so are we in here or????')
  switch (action.type) {
  case ADD_CARTITEM:
    console.log('um we are in here ')
    state.cart = [...state.cart, action.cart]
    state.currentOrder = action.currentOrder || state.currentOrder
    console.log(state)
    return state
  }
  return state
}

const ADD_CARTITEM = 'ADD_CARTITEM'

export const newCartItem = (cartItem, currentOrder) => ({
  type: ADD_CARTITEM, cartItem, currentOrder
})


export const addToCart = () => 
    dispatch => {
      let userId = 2 
      const postCartItem = axios.post('/api/cartitem/').then(item => item.data)
      const findCurrentOrder = axios.get(`api/order/current/${userId}`).then(order => order.data)
      Promise.all([postCartItem, findCurrentOrder])
        .then(results => {
            let cartItem = results[0], currentOrder = results[1]
            return [cartItem, currentOrder]
        })
        .then(r => dispatch(newCartItem(r[0], r[1])))
        // .spread((cartItem, currentOrder) => dispatch(newCartItem(cartItem, currentOrder)))
        .catch(console.err)
    }
    
export default reducer

    //   axios.post('/api/cartitem/')
    //     .then((cartItem) => dispatch(newCartItem(cartItem.data)))
    //     .catch(console.err)