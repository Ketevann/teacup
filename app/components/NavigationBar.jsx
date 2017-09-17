import React, { Component } from 'react'
import { Link } from 'react-router'
import { login, thirdPartyLogin } from 'APP/app/reducers/auth'
import { logout } from 'APP/app/reducers/auth'
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

import { connect } from 'react-redux'

class NavigationBar extends Component {

  clickHandler(){
    this.props.logout()
  }
  render() {
    {console.log(this.props, 'props')}
    let cart = this.props.cart
    return (


//       {this.props.authUser ?
//                 <ul className="nav navbar-nav">
//  <li><Link className="link" to={`users/${this.props.authUser.id}`}>My Profile</Link></li>
//     <li className="whoami-user-name">{this.props.authUser && this.props.authUser.name} </li>
//     <button className="logout, btn-danger" onClick={() => this.clickHandler()}>Logout</button></ul>
//              :  <li> <Link to="/login">Login</Link></li>}

 <Navbar  collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#" id="teacup">TeaCup</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>


          <Nav>
        <NavItem eventKey={1} to="/">
          <Link className="link" to="/">Home</Link>
        </NavItem>
        <NavItem eventKey={2} href="#">
          <Link className="link menu-icon" to='/cart'>Cart({cart.length})</Link>
        </NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">

          {this.props.authUser && this.props.authUser.name ?
               <MenuItem eventKey={3.1}>
              <Link className="link" to={`users/${this.props.authUser.id}`}>My Profile</Link>
              </MenuItem> : null}
          <MenuItem eventKey={3.1}>
            <Link className="link" to='/products'>Products</Link>
          </MenuItem>
        {this.props.authUser && this.props.authUser.role === 'admin' ?
                          <MenuItem>
          <MenuItem eventKey={3.2}>
            <Link className="link" to='/allOrders'>All Orders</Link>
          </MenuItem>
          <MenuItem eventKey={3.3}>
            <Link className="link" to='admin/users'>All Users</Link>
          </MenuItem>
          </MenuItem>
          :null}

          <MenuItem eventKey={3.3}>
            <Link className="link" to='/currentUserOrders'>My Orders</Link>
          </MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight className="right">

        {this.props.authUser && this.props.authUser.name?
          <Nav>
          <NavItem className="usernamelogout">
          {this.props.authUser && this.props.authUser.name}
           </NavItem>
           <NavItem>
            <button className="usernamelogout" onClick={() => this.clickHandler()}>Logout</button>
            </NavItem>
                </Nav>
          :
          <NavItem eventKey={2} href="#">
          <Link id="loginlink" to="/login">Login</Link>
          </NavItem>

      }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    )
  }
}
const mapStateToProps = (state) => {
  return { authUser: state.auth, cart: state.cartItems }
}
export default connect(mapStateToProps, { login, logout })(NavigationBar)





//       <nav className="navbar-more-overlay">
//         <div className="navbar navbar navbar-fixed-top animate">
//           <div className="navbar-header ">
//             <a className="navbar-brand" href="#"><span id="teacup">TeaCup</span></a>
//           </div>
//           <div className="container navbar-more visible-xs">
//           </div>
//           <div className="navbar-header">
//             <ul className="nav navbar-nav">
//               <li className="active"><Link className="link" to="/">Home</Link></li>
//               <li><Link className="link menu-icon" to='/cart'>Cart ({cart.length})</Link></li>
//               <li><Link className="link" to='/products'>Products</Link></li>
//               {this.props.authUser && this.props.authUser.role === 'admin' ?
//                <ul className="nav navbar-nav">
//                 <li><Link className="link" to='/allOrders'>All Orders</Link></li>

//                 <li><Link className="link" to='admin/users'>All Users</Link></li></ul>
//                : null}
//               <li><Link className="link" to='/currentUserOrders'>My Orders</Link></li>

//               {this.props.authUser ?
//                 <ul className="nav navbar-nav">
//  <li><Link className="link" to={`users/${this.props.authUser.id}`}>My Profile</Link></li>
//     <li className="whoami-user-name">{this.props.authUser && this.props.authUser.name} </li>
//     <button className="logout, btn-danger" onClick={() => this.clickHandler()}>Logout</button></ul>
//              :  <li> <Link to="/login">Login</Link></li>}
//               <li>
//                 <br />
//               </li>

//             </ul>
//           </div>
//         </div>
//       </nav>
