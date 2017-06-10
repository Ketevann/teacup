import React, { Component } from 'react'
import {} from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { loadOrders } from 'APP/app/reducers/orders'

class Orders extends Component {
    constructor(props){
      super(props)
    }

    render () {
      return (
        <div>
        <h1> User Orders </h1>
          {this.props.orders.map((order, index) => {
            return (<div><li key={index}> <h2> {order.status} </h2></li></div>)
          })}
        </div>

      )
    }
}


const mapStateToProps = (state) => {
  console.log(state)
  console.log('state above')

  return {
      orders: state.orders.userOrders
  }

}

export default connect(mapStateToProps)(Orders)
