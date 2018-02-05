import React, { Component } from 'react'
import { Link } from 'react-router'
import { login, thirdPartyLogin } from 'APP/app/reducers/auth'
import { logout } from 'APP/app/reducers/auth'
import { filterRemove } from '../reducers/products'
import store from '../store'
import {
  cancelSearch, searchProduct
} from '../reducers/search'
import {
  Nav, Navbar, NavItem, MenuItem, NavDropdown,
  FormGroup, FormControl, ControlLabel,
  Button

} from 'react-bootstrap';
import {
  search

} from '../reducers/products'
import { connect } from 'react-redux'
const products = ['jasmine', 'earl gray', 'black', 'peppermint', 'apple tea', 'rose tea'];
var temp = [];

let accumulate = (acc, cur) => {

  console.log(acc, cur)
  return Number(acc) + Number(cur)
}
class NavigationBar extends Component {

  clickHandler() {
    this.props.logout()
  }


  someFunc = (name) => {
    var nameField = document.getElementById('search');
    nameField.value = name

  }

  componentDidMount() {
    store.dispatch(cancelSearch())
  }

  findWords = (text) => {
    console.log(text,' text in find words')
    text = text.toLowerCase()
    if (typeof text[temp.length] === 'string') temp.push(text[temp.length])
    let complete = []
    //for (let i = 0; i < temp.length; i++) {

    for (var j = 0; j < products.length; j++) {
      if (text[0] === products[j][0]) {
        // products[j], j ,'jjjj', complete.indexOf(products[j]))
        if (complete.indexOf(products[j] === -1)) complete.push(products[j])
        //compare(temp.join(''), products[j], temp[i],j ,'jjjj')
        //}
      }
    }
    var news = []
    for (var m = 0; m < complete.length; m++) {
      if (complete[m].slice(0, text.length) === text) {
        news.push(complete[m])
      }
    }

    return news


  }

  checkSearchState = (text) => {
    if (text === '') {
      store.dispatch(cancelSearch())
    }
    else {
      console.log(text, ' IN CHECKSEARCHSTATE')
      const productsArray = this.findWords(text)
      store.dispatch(searchProduct(productsArray))

    }
  }

  call() {
    store.dispatch(search(evt.target.search.value))
  }

  render() {
    let cart = this.props.cart
    return (



      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link id="teacup" className="link" to="/">TeaCup</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>


            <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">

              <MenuItem eventKey={3.1}>
                <Link className="link" to='/products' onClick={() => store.dispatch(filterRemove())}>Products</Link>
              </MenuItem>

              {this.props.authUser && this.props.authUser.name ?
                <MenuItem eventKey={3.1}>
                  <Link className="link" to={`users/${this.props.authUser.id}`}>My Profile</Link>
                </MenuItem> : null}

              {this.props.authUser && this.props.authUser.role === 'admin' ?
                <MenuItem>
                  <MenuItem eventKey={3.2}>
                    <Link className="link" to='/allOrders'>All Orders</Link>
                  </MenuItem>
                  <MenuItem eventKey={3.3}>
                    <Link className="link" to='admin/users'>All Users</Link>
                  </MenuItem>
                </MenuItem>
                : null}
              {this.props.authUser && this.props.authUser.name ?
                <NavItem eventKey={3.3}>
                  <Link className="link" to='/currentUserOrders'>My Orders</Link>
                </NavItem> : null}
            </NavDropdown>
          </Nav>
          <Nav pullRight className="right">
            {this.props.products && this.props.products.path === true ?

                <Navbar.Form pullLeft
                  onSubmit={(evt) => {
                    evt.preventDefault()
                    store.dispatch(search(evt.target.search.value))
                  }
                  }
                >
                  <FormGroup className="formgroup">
                    <FormControl className="formgroup" type="text" placeholder="Search"
                      onChange={(evt) => console.log(this.checkSearchState(evt.target.value))
                      } id="search" type="text" name="searching" placeholder="Search"
                      type="text" className="form-control" placeholder="Search"

                    />
                  </FormGroup>{' '}

                        <Button type="submit"><i className="glyphicon glyphicon-search" /></Button>



                  <div className="autocomplete" >
                    {this.props.searched && this.props.searched.listnames ?
                      this.props.searched.names.map(names => {
                        return <div onClick={() => this.someFunc(names)} id="names">{names}</div>
                      })
                      : null} </div>
                </Navbar.Form> : null}

            {this.props.authUser && this.props.authUser.name ?
                  <Nav>
                    <NavItem className="usernamelogout">
                      {this.props.authUser && this.props.authUser.name}
                    </NavItem>
                    <NavItem>
                      <button className="usernamelogout" onClick={() => this.clickHandler()}>Logout</button>
                    </NavItem>
                  </Nav>
                  :
                  <NavItem eventKey={3} href="#">
                    <Link id="loginlink" to="/login">Login</Link>
                  </NavItem>

                }
                <NavItem eventKey={2} href="#">
                  <Link className="link menu-icon" to='/cart'>Cart({this.props.cart && this.props.cart.items ? this.props.cart.items.map(el => el.quantity).reduce(accumulate, 0) : 0})</Link>
                </NavItem>
              </Nav>
        </Navbar.Collapse>
      </Navbar>

          )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {authUser: state.auth, cart: state.cartItems, searched: state.searchNames, products: state.products }
}
export default connect(mapStateToProps, {login, logout, filterRemove, cancelSearch, search })(NavigationBar)










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