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
  Button, Popover

} from 'react-bootstrap';
import {
  search
} from '../reducers/products'
import { connect } from 'react-redux'

//available products
const products = ['jasmine', 'earl gray', 'black', 'peppermint', 'apple tea', 'rose tea'];

let accumulate = (acc, cur) => {
  return Number(acc) + Number(cur)
}
class NavigationBar extends Component {

  clickHandler() {
    this.props.logout()
  }

  // clear search input
  clearInput = () => {
    var nameField = document.getElementById('search');
    document.getElementById('names').innerHTML = '';
    nameField.value = ''
    store.dispatch(cancelSearch())
  }
  //clears search
  componentDidMount() {
    store.dispatch(cancelSearch())
  }

  //creates suggestions based on input
  findWords = (text) => {
    text = text.toLowerCase()
    let complete = []
    //if the search keyword matches a product name push to an array
    for (var j = 0; j < products.length; j++) {
      if (text[0] === products[j][0]) {
        if (complete.indexOf(products[j]) === -1) complete.push(products[j])

      }
    }
    var suggestion = []
    //if the input stops matching returns an empty array
    for (var m = 0; m < complete.length; m++) {
      if (complete[m].slice(0, text.length) === text) {
        suggestion.push(complete[m])
      }
    }
    return suggestion
  }

  checkSearchState = (text) => {
    if (text === '') {
      // if keyword is empty clear search
      store.dispatch(cancelSearch())
    }
    else {
      //search for searched product
      const productsArray = this.findWords(text)
      store.dispatch(searchProduct(productsArray))

    }
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
              <Navbar.Form pullLeft>
                <form
                  onSubmit={(evt) => {
                    evt.preventDefault()
                    if(evt.target.search.value !== '')
                    store.dispatch(search(evt.target.search.value))
                  }
                  }
                >
                  <FormGroup className="formgroup">
                    <FormControl className="formgroup" type="text" placeholder="Search"
                      onChange={(evt) => this.checkSearchState(evt.target.value)
                      } id="search" type="text" name="searching" placeholder="Search"
                      type="text" className="form-control" placeholder="Search"

                    />
                  </FormGroup>{' '}
                  <Button type="submit"><i className="glyphicon glyphicon-search" /></Button>
                  <div className="autocomplete" >
                    {this.props.searched && this.props.searched.listnames ?
                      this.props.searched.names.map(names => {
                        return <div onClick={() => {
                          store.dispatch(search(names))
                          this.clearInput()
                        }
                        } id="names">{names}</div>
                      })
                      : null} </div>
                </form> </Navbar.Form> : null}

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
  return { authUser: state.auth, cart: state.cartItems, searched: state.searchNames, products: state.products }
}
export default connect(mapStateToProps, { login, logout, filterRemove, cancelSearch, search })(NavigationBar)