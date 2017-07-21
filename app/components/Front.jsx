import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";




class Front extends Component {
  constructor(props){
    super()
  }
  render(){

    return (<div className="homepage">
    <p id="homepagetext">At Tea Trekker we sell the teas that we want to drink and that we want our customers to drink, too.   </p>
    </div>)
  }
}


export default connect(
   ({}) => ({}),
  {},
)(Front)

