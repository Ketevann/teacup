import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  users: require('./users').default,
  orders: require('./orders').default

})

export default rootReducer
