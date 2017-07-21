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
      <nav className="navbar navbar-default navbar-fixed-top ">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#"><span id="teacup">TeaCup</span></a>
    </div>
    <ul className="nav navbar-nav">

            <li className="active"><Link to="/">Home</Link></li>

            <li><Link to='/cart'>Cart ({cart.length})</Link></li>
            <li><Link to='/products'>Products</Link></li>
             {this.props.authUser && this.props.authUser.role==='admin' ?
             <li><Link to='/allOrders'>All Orders</Link></li>
             : null}
              {this.props.authUser && this.props.authUser.role==='admin' ?
              <li><Link to='admin/users'>All Users</Link></li>
             : null}

            <li><Link to='/currentUserOrders'>My Orders</Link></li>
             {this.props.authUser ?  <li><Link to={`users/${this.props.authUser.id}`}>My Profile</Link></li> : null}

              <li>
    <form className='login' onSubmit={evt => {
      evt.preventDefault()
      console.log(evt.target.username.value, evt.target.password.value, "%%%")
      this.props.login(evt.target.username.value, evt.target.password.value)
    } }>
      <input name="username" />
      <input name="password" type="password" />
      <input type="submit" value="Login" />
    </form>
    <br/>
    </li>







          </ul>
        </div>

</nav>



      )
    }
}


const mapStateToProps = (state) => {
  return {authUser: state.auth, cart: state.cartItems}
}
export default connect(mapStateToProps,{login})(NavBar)

