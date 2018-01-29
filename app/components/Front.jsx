import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";
import { loadCartItems } from '../reducers/cartItems'




class Front extends Component {

  componentWillMount() {
    this.props.loadCartItems();
  }
  render() {

    return (<div className="homepage">

    </div>)
  }
}


export default connect(null, { loadCartItems })(Front)

