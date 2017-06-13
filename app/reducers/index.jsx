import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  users: require('./users').default,
  cartItems: require('./cartItems').default,

})

export default rootReducer
