'use strict'

import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Jokes from './components/Jokes'
import NavBar from './components/Navbar'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Products from './components/Products'
import Product from './components/Product'
import {loadProducts} from 'APP/app/reducers/products'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import {fetchUsers} from './reducers/users'
import Orders from './components/Orders'
import AllOrders from './components/AllOrders'
import {loadOrders, loadAllOrders} from './reducers/orders'


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

const onProductsEnter = () => {
  store.dispatch(loadProducts())
}
const onOrdersEnter = () => {
  console.log('GIVE UP')
  store.dispatch(loadOrders())
}
const onAllOrdersEnter = () => {
  store.dispatch(loadAllOrders())
}

render(

  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}  >
        <IndexRedirect to="/products" />
        <Route path="/foobar" component={NavBar} onEnter={onProductsEnter}>
          <Route path="/products" component={Products}/>
          <Route path="/products/:productId" component={Product}/>
          <Route path="/users" component={Users} onEnter={fetchUsers()} />
          <Route path="/users/:userId" component={SingleUser} />
          <Route path="/currentUserOrders" component={Orders} onEnter={onOrdersEnter}/>
          <Route path="/allOrders" component={Orders} onEnter={onAllOrdersEnter}/>
        </Route>
        <Route path="/"/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,

  document.getElementById('main')

)
