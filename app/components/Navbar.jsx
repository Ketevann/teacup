import React, { Component } from 'react'
import { Link } from 'react-router'
import { login, thirdPartyLogin } from 'APP/app/reducers/auth'
import { logout } from 'APP/app/reducers/auth'


import { connect } from 'react-redux'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }
  clickHandler(){
    this.props.logout()
  }
  render() {
    {console.log(this.props, 'props')}
    let cart = this.props.cart
    return (
      <nav className="navbar-more-overlay">
        <div className="navbar navbar navbar-fixed-top animate">
          <div className="navbar-header ">
            <a className="navbar-brand" href="#"><span id="teacup">TeaCup</span></a>
          </div>
          <div className="container navbar-more visible-xs">
          </div>
          <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li className="active"><Link className="link" to="/">Home</Link></li>
              <li><Link className="link menu-icon" to='/cart'>Cart ({cart.length})</Link></li>
              <li><Link className="link" to='/products'>Products</Link></li>
              {this.props.authUser && this.props.authUser.role === 'admin' ?
               <ul className="nav navbar-nav">
                <li><Link className="link" to='/allOrders'>All Orders</Link></li>

                <li><Link className="link" to='admin/users'>All Users</Link></li></ul>
               : null}
              <li><Link className="link" to='/currentUserOrders'>My Orders</Link></li>

              {this.props.authUser ?
                <ul className="nav navbar-nav">
 <li><Link className="link" to={`users/${this.props.authUser.id}`}>My Profile</Link></li>
    <li className="whoami-user-name">{this.props.authUser && this.props.authUser.name} </li>
    <button className="logout, btn-danger" onClick={() => this.clickHandler()}>Logout</button></ul>
             :  <li> <Link to="/login">Login</Link></li>}
              <li>
                <br />
              </li>

            </ul>
          </div>
        </div>
      </nav>
    )
  }
}


const mapStateToProps = (state) => {
  return { authUser: state.auth, cart: state.cartItems }
}
export default connect(mapStateToProps, { login, logout })(NavBar)

