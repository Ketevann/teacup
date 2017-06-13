import React, { Component } from 'react'
import {} from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { loadOrders, loadSingleUserOrders } from 'APP/app/reducers/orders'

class Orders extends Component {
    constructor(props){
      super(props)
    }

    render () {
      var orders = this.props.orders
      return (
         <div>

        <table className="table">

          <thead className="thead-inverse">

            <tr>


              <th>Order ID</th>

              <th>Status</th>

              <th>Destination</th>


            </tr>

          </thead>

          {orders.length ? orders.map((order) => {

            return (

              <tbody>

                <tr>

                  <th scope="row">{order.id}</th>

                    <td >{order.status}</td>

                    <td >{order.Apartment} {order.Street}, {order.City}, {order.State}</td>


                  <button className="glyphicon glyphicon-remove"></button>

                  <button className="glyphicon glyphicon-edit"></button>

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

  return {
      orders: state.orders.userOrders
  }

}

const mapDispatch = null

export default connect(mapStateToProps,mapDispatch)(Orders)
