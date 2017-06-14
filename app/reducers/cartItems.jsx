import axios from 'axios'

const initialState = {currentOrder: {}, cart: []}


const reducer = (state=initialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
  case ADD_CARTITEM:
    return nextState.cart = [...state.cart, action.cartItem]
  case GET_CART:
    return nextState.cart = [...action.cartItems]
  case CART_TOTAL:
    return nextState.total = action.total  
  case CHECKOUT_ORDER:
    return nextState.cart = []    
  default:
    return state
  }
}

const ADD_CARTITEM = 'ADD_CARTITEM'

export const newCartItem = (cartItem) => ({
  type: ADD_CARTITEM, cartItem
})

const GET_CART = 'GET_CART'

export const getCart = (cartItems) => ({
  type: GET_CART, cartItems
})

const CART_TOTAL = 'CART_TOTAL'

export const cartTotal = (total) => ({
  type: CART_TOTAL, total
})

const CHECKOUT_ORDER = 'CHECKOUT_ORDER'

export const checkoutCart = () => ({
  type: CHECKOUT_ORDER
})

export const addToCart = (itemInfo) => 
    dispatch => {
      let userId = 1 //will be SENT as this.props.auth.userId eventually
      axios.post('/api/cartitem/', itemInfo)
      .then(item => {
        dispatch(newCartItem(item.data))
        .catch(console.err)
      })

  }

export const loadCartItems = () => 
    dispatch => {
      let orderId = 2
      axios.get(`/api/cartitem/all/${orderId}`)
        .then((items) => {
          dispatch(getCart(items.data)) 
          return items.data})
        .catch(console.err)}



export const checkOut = () => 
  dispatch => {
    let orderId = 1
    axios.put(`/api/cartitem/checkout/${orderId}`)
    .then(() => dispatch(checkoutCart()))
    .catch(console.err)
  }

export default reducer


