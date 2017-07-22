import React, { Component } from 'react'
import { Link } from 'react-router'
import {login, thirdPartyLogin} from 'APP/app/reducers/auth'


import {connect} from 'react-redux'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props, 'prop')
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
             {this.props.authUser && this.props.authUser.role==='admin' ?
             <li><Link className="link" to='/allOrders'>All Orders</Link></li>
             : null}
              {this.props.authUser && this.props.authUser.role==='admin' ?
              <li><Link className="link" to='admin/users'>All Users</Link></li>
             : null}

            <li><Link className="link" to='/currentUserOrders'>My Orders</Link></li>
             {this.props.authUser ?  <li><Link className="link" to={`users/${this.props.authUser.id}`}>My Profile</Link></li> : null}

              <li>



    <br/>
    </li>







          </ul>
          </div>
        </div>

</nav>



      )
    }
}


const mapStateToProps = (state) => {
  return {authUser: state.auth, cart: state.cartItems}
}
export default connect(mapStateToProps,{login})(NavBar)

