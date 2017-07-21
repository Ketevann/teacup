import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";




class Front extends Component {
  constructor(props){
    super()
  }
  render(){

    return (<div className="homepage">
    <p id="homepagetext">At Tea Trekker we sell the teas that we want to drink and that we want our customers to drink, too. Whether a bracing orthodox-leaf Assam black tea from northeast India, a delicate mao feng green tea from Fujian Province in eastern China, a sweet sencha drunk from a wabi-sabi tea cup, or a floral Dan Cong shared amongst budding poets, our passion is for you to experience the taste of tea that is pure and sublime. Our teas represent the best of man and nature working together to create fine, unique teas using traditional tea making methods</p>
    </div>)
  }
}


export default connect(
   ({}) => ({}),
  {},
)(Front)

