import React, { Component } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
      let cart = this.props.cart
      return (
      <div>
      <nav className="navbar navbar-toggleable-xl navbar-light bg-faded">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Foobars</Link>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to='/cart'>Cart {cart.length}</Link></li>
            <li><Link to='/orders'>All Orders</Link></li>
          </ul>
        </div>
      </nav>
      {this.props.children}
      </div>
      )
    }
}

export default connect(
  state => ({cart: state.cartItems}),
  {},
)(NavBar)