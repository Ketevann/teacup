import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class NavBar extends Component {
  constructor(props){
    super(props)
  }
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
          {this.props.authUser && this.props.authUser.role==='admin' && <li><Link to='/allOrders'>All Orders</Link></li>}
          <li><Link to='/currentUserOrders'>My Orders</Link></li>
        </ul>
      </div>
    </nav>
    {this.props.children}
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('STATE',state)
  return {authUser: state.auth}
}
export default connect(mapStateToProps,null)(NavBar)

