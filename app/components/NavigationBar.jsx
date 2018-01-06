import React, { Component } from 'react'
import { Link } from 'react-router'
import { login, thirdPartyLogin } from 'APP/app/reducers/auth'
import { logout } from 'APP/app/reducers/auth'
import { filterRemove } from '../reducers/products'
import store from '../store'
import {
  cancelSearch, searchProduct
} from '../reducers/search'
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import {
  search

} from '../reducers/products'
import { connect } from 'react-redux'
const products = ['jasmine', 'earl gray', 'black', 'peppermint', 'apple tea', 'rose tea' ];
var temp = [];
class NavigationBar extends Component {

  clickHandler() {
    this.props.logout()
  }

  someFunc = (name) => {
    var nameField = document.getElementById('search');
    console.log(nameField, 'namefield', name)
    nameField.value = name

  }
  componentDidMount() {
    store.dispatch(cancelSearch())
  }

  findWords = (text) => {
    if (typeof text[temp.length] === 'string') temp.push(text[temp.length])
    // console.log(temp, 'this is temp', text, "&&**")
    let complete = []
    // console.log(text, 'text', text.lenght, typeof text)
    //for (let i = 0; i < temp.length; i++) {
    //console.log('in loop')
    for (var j = 0; j < products.length; j++) {
      console.log('in loop', j, products[j], temp)
      //  console.log(text[i] === products[j][0], text[i] === products[j])
      if (text[0] === products[j][0]) {
        //console.log('equal', temp, products[j], temp.join(''), temp[0] === products[j][0],
        // products[j], j ,'jjjj', complete.indexOf(products[j]))
        if (complete.indexOf(products[j] === -1)) complete.push(products[j])
        //compare(temp.join(''), products[j], temp[i],j ,'jjjj')
        //}
      }
    }
    console.log('complete', complete)
    var news = []
    for (var m = 0; m < complete.length; m++) {
      // console.log('looop', complete[m].slice(0, text.length), text.length+1)
      if (complete[m].slice(0, text.length) === text) {
        //  console.log('texts are equal', complete[m])
        news.push(complete[m])
      }
      // else console.log('not equal')
    }

    return news

    // function compare(text, word) {
    //  console.log('text is right', text, word, text.length)
    //   for (let l = 0; l < text.length; l++) {
    //     //for (var k = l; k < text.length; k++) {
    //       if (text[l] === word[l]) {
    //         console.log(word, 'words are equal', text[l],' ***', word[l], text[l] === word[l])
    //      // }
    //     }
    //     else console.log('not equal')
    //   }
    // }
  }

  checkSearchState = (text) => {
    console.log('in checkstate', text)
    if (text === '') {
      store.dispatch(cancelSearch())
    }
    else {
      const productsArray = this.findWords(text)
      store.dispatch(searchProduct(productsArray))

    }
  }

  call() {
    console.log('hhhhh')
    store.dispatch(search(evt.target.search.value))
  }

  render() {
    { console.log(this.props, 'props') }
    let cart = this.props.cart
    return (


      //       {this.props.authUser ?
      //                 <ul className="nav navbar-nav">
      //  <li><Link className="link" to={`users/${this.props.authUser.id}`}>My Profile</Link></li>
      //     <li className="whoami-user-name">{this.props.authUser && this.props.authUser.name} </li>
      //     <button className="logout, btn-danger" onClick={() => this.clickHandler()}>Logout</button></ul>
      //              :  <li> <Link to="/login">Login</Link></li>}

      <Navbar collapseOnSelect>
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
            <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">

              {this.props.authUser && this.props.authUser.name ?
                <MenuItem eventKey={3.1}>
                  <Link className="link" to={`users/${this.props.authUser.id}`}>My Profile</Link>
                </MenuItem> : null}
              <MenuItem eventKey={3.1}>
                <Link className="link" to='/products' onClick={() => store.dispatch(filterRemove())}>Products</Link>
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
                : null}

              <MenuItem eventKey={3.3}>
                <Link className="link" to='/currentUserOrders'>My Orders</Link>
              </MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight className="right">
            {this.props.products && this.props.products.path === true ?
              <Nav eventKey={2} href="#" className="usernamelogout">
                <form className="navbar-form" role="search"
                  onSubmit={(evt) => {
                    evt.preventDefault()
                    store.dispatch(search(evt.target.search.value))

                  }
                  }
                >
                  <div className="input-group">
                           <input onChange={(evt) => console.log(this.checkSearchState(evt.target.value))

            // console.log(evt.target.value,' target')
          } id="search" type="text" name="searching" placeholder="Search"
          type="text" className="form-control" placeholder="Search"
           />
                    <div className="input-group-btn">
                      <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search" /></button>
                    </div>
                  </div>






                  <div className="autocomplete" >
                    {this.props.searched && this.props.searched.listnames ?


                      this.props.searched.names.map(names => {
                        return <div onClick={() => this.someFunc(names)} id="names">{names}</div>

                      })
                      : null} </div> </form>


              </Nav> : null}
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

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, 'check routes ')
  return { authUser: state.auth, cart: state.cartItems, searched: state.searchNames, products: state.products }
}
export default connect(mapStateToProps, { login, logout, filterRemove, cancelSearch, search })(NavigationBar)










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
