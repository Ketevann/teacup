import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";
import { whoami } from '../reducers/auth'
import { loadCartItems } from '../reducers/cartItems'




class Front extends Component {

  componentWillMount(){
    //loads user cart items on enter
    this.props.loadCartItems()
  }
  render() {
    return (<div className="homepage"></div>)
  }
}


export default connect(({ auth}) => ({ auth}), { whoami, loadCartItems })(Front)
