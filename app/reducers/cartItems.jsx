import axios from 'axios'
import { whoami } from './auth'
const initialState = { items: [], product: [] }


const reducer = (state = initialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case ADD_CARTITEM:
      console.log('in cartitem reducer', action)
      return { ...state, items: action.items, product: [action.product] }
    case GET_CART:
      return action.cartItems
    case CART_TOTAL:
      return nextState.total = action.total
    case CHECKOUT_ORDER:
      return nextState.cart = []
    default:
      return state
  }
}

const ADD_CARTITEM = 'ADD_CARTITEM'

export const newCartItem = ({ items, product }) => {
  return { type: ADD_CARTITEM, items, product }
}

const GET_CART = 'GET_CART'

export const getCart = (cartItems) => {
  console.log('in cart action creater')
  return { type: GET_CART, cartItems }

}

const CART_TOTAL = 'CART_TOTAL'

export const cartTotal = (total) => ({
  type: CART_TOTAL, total
})

const CHECKOUT_ORDER = 'CHECKOUT_ORDER'

export const checkoutCart = () => ({
  type: CHECKOUT_ORDER
})

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
    console.log('in get OrderOrooror')
    let userId = itemInfo.userId
    if (userId !== undefined) {
      axios.get(`/api/order/users/${userId}`)
        .then(order => {
          console.log('returned order', order)
          if (!order.data) {
            axios.post(`/api/order/${userId}`, itemInfo)
              .then(savedOrder => {
                console.log(savedOrder, 'saved Order')
                itemInfo.orderId = order.data.id
                return axios.post('/api/cartitem/', itemInfo)
                  .then(item => {
                    console.log(item, 'got back')
                    return dispatch(newCartItem(item.data))
                  })
                  .catch(console.error)

              });
          }

          else {
            itemInfo.orderId = order.data[0].id
            console.log(itemInfo, ' OGOGOGOGOOG', order)
            return axios.post('/api/cartitem/', itemInfo)
              .then(item => {
                console.log(item, 'got back')
                return dispatch(newCartItem(item.data))
              })
              .catch(console.error)
          }
        })
      //   console.log(itemInfo, ' OGOGOGOGOOG', order)
      //   return axios.post('/api/cartitem/', itemInfo)
      // })
      // .then(item => {
      //   console.log(item, 'got back')
      //   return dispatch(newCartItem(item.data))
      // })
      // .catch(console.error)
    } else {
      return axios.post('/api/cartitem/notlogged', itemInfo)
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
     .then(user =>{



    if (user) {
      console.log(user, 'user')
      let userId = user.data.id
      console.log(userId, ' USER ID IN LOADCART')
     return axios.get(`/api/order/users/${userId}`)


        .then((order) => {
          console.log('items!!!', order.id)
          let orderId = order.data[0].id
         return axios.get(`/api/cartitem/all/${orderId}`)
          .then(cartItems =>{
            console.log(cartItems, 'cartItems')
            return dispatch(getCart(cartItems.data))
          })

          //  return items.data
        })
        .catch(console.error)

  }
    else {
      //if user is not logged in cart shows zero items
      return dispatch(getCart([]))
    }

  })
  }

export const checkOut = () =>
  dispatch => {
    let orderId = 1
    axios.put(`/api/cartitem/checkout/${orderId}`)
      .then(() => dispatch(checkoutCart()))
      .catch(console.error)
  }

export default reducer



/*
what i wanted to do to find or create a new pending order
lol :(

//first...
export const getUserIdThenCart = () =>

  dispatch => {
    axios.get('/api/auth/whoami')
      .then(who => {
        const user = who.data
        dispatch(getOrMakeLoader(user))
      })
      .catch(console.error)}



//then...
export const getOrMakeLoader = (user) =>
  dispatch => {
    let userId = user.id
    axios.get(`/api/order/${userId}`)
      .then(order => dispatch(loadCartItems(order)))
      .catch(console.error)
  }


//finally...
export const loadCartItems = (order) =>
    dispatch => {
      let orderId = order.data[0].id
      axios.get(`/api/cartitem/all/${orderId}`)
        .then((items) => {
          dispatch(getCart(items.data))
          return items.data})
        .catch(console.error)}

*/

