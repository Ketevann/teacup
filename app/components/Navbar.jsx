import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NavBar extends Component {
render() {
    return (
    <div>
    <nav className="navbar navbar-toggleable-xl navbar-light bg-faded">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Foobars</Link>
        </div>
        <ul className="nav navbar-nav">
          <li className="active"><Link to="/">Home</Link></li>
          <li><Link to='/'>Cart 0</Link></li>
          <li><Link to='/'>All Orders</Link></li>
          <li><Link to='/currentUserOrders'>My Orders</Link></li>
        </ul>
      </div>
    </nav>
    {this.props.children}
    </div>
    )
  }
}