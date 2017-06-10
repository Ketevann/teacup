import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import React, { Component } from 'react';


/*  Components: */

import store from '../store'
import Jokes from './Jokes'
import NavBar from './Navbar'
import Login from './Login'
import WhoAmI from './WhoAmI'
import NotFound from './NotFound'
import Orders from './Orders'
import AppContainer from './AppContainer'
import { loadOrders } from '../reducers/orders'


/*  Routes: */

const Routes = ({ fetchOrders }) => (
     <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="/foobar" component={NavBar} />
        <Route path="/orders" component={Orders} onEnter={fetchOrders} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
)

/* Container */

const mapStateToProps = null

const mapDispatch = dispatch => ({
  fetchOrders: () => {
    dispatch(loadOrders());
  }
})

export default connect(mapStateToProps, mapDispatch)(Routes);
