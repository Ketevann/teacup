import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";




class Front extends Component {
  constructor(props){
    super()
  }
  render(){

    return (<div className="homepage">

    </div>)
  }
}


export default connect(
   ({}) => ({}),
  {},
)(Front)

