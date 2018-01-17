'use strict'

import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store from './store'
import NavigationBar from './components/NavigationBar'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Products from './components/Products'
import Product from './components/Product'
import { loadProducts } from 'APP/app/reducers/products'
import { loadCartItems } from 'APP/app/reducers/cartItems'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import Cart from './components/Cart'
import { fetchUsers } from './reducers/users'
import Orders from './components/Orders'
import AllOrders from './components/AllOrders'
import AppContainer from './components/AppContainer'
import { loadOrders, loadAllOrders } from './reducers/orders'
import Userprofile from './components/Userprofile'
import Front from './components/Front'
import Update from './components/Update'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import {
  cancelSearch, searchProduct
} from './reducers/search'


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>

      <nav>
        <NavigationBar />

      </nav>
      {children}
    </div>
  )

const onProductsEnter = () => {
  store.dispatch(loadProducts())
     store.dispatch(cancelSearch)

}

const onCartEnter = () => {
  store.dispatch(loadCartItems())
}
const onOrdersEnter = () => {
  store.dispatch(loadOrders())
}
const onAllOrdersEnter = () => {
  store.dispatch(loadAllOrders())

}

const onUsersEnter = () => {
  store.dispatch(fetchUsers())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
    <Route path="/reset/:token" component={ResetPassword} />
      <Route path="/" component={ExampleApp}  >
        <IndexRedirect to="/home" />
        <Route path='/home' component={Front} />
        <Route path='/update/:productId' component={Update} />
        <Route path='/add' component={Update} />
        <Route path="/foobar" component={AppContainer} onEnter={onCartEnter} onEnter={onUsersEnter} >
          <Route path="/products" component={Products} onEnter={onProductsEnter} />
          <Route path="/products/:productId" component={Product} />
          <Route path="/admin/users" component={Users} onEnter={onUsersEnter} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/admin/users/:userId" component={SingleUser} />
          <Route path="/users/:userId" component={Userprofile} />
          <Route path="/cart" component={Cart} onEnter={onCartEnter} />
          <Route path="/currentUserOrders" component={Orders} onEnter={onOrdersEnter} />
          <Route path="/allOrders" component={Orders} onEnter={onAllOrdersEnter} />
          <Route path='/forgotpassword' component={ForgotPassword} />
        </Route>
        <Route path="/" />
      </Route>
      <Route path='*' component={NotFound} />


    </Router>
  </Provider>,

  document.getElementById('main')

)
