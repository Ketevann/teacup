import React, { Component } from 'react'
import {} from 'APP/app/reducers/auth'
import { connect } from 'react-redux'



class AllOrders extends Component {
    constructor(props){
      super(props)
    }

    render () {
    	console.log('in AllOrders????')
      
      return (
         <h1>All Orders</h1>
      )
    }
}


const mapStateToProps = (state) => {
	console.log('ALLORDERS STATE')
  return {
      orders: state.orders.userOrders
  }

}

const mapDispatch = null

export default connect(mapStateToProps,mapDispatch)(AllOrders)
