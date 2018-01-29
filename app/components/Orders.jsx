import React, { Component } from 'react'
import { } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { loadOrders, loadSingleUserOrders } from 'APP/app/reducers/orders'

class Orders extends Component {

  componentDidMount(){
    this.props.loadOrders()
  }

  render() {
    console.log(this.props, ' props in orders')
    const {userOrders} = this.props.orders
    return (
      <div id="orders">
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Destination</th>
            </tr>
          </thead>
          {userOrders ? userOrders.map((order) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{order.id}</th>
                  <td >{order.status}</td>
                  <td >{order.Apartment} {order.Street}, {order.City}, {order.State}</td>

                </tr>
              </tbody>)
          })
            : null}
        </table>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(state, 'state', state.orders.userOrders, state.orders)
  return {
    orders: state.orders
  }
}


export default connect(mapStateToProps, {loadOrders})(Orders)
