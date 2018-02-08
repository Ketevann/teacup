import React, { Component } from 'react'
import { } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { loadOrders, loadSingleUserOrders } from 'APP/app/reducers/orders'

class Orders extends Component {

  componentDidMount() {
    this.props.loadOrders()
  }

  render() {
    const { userOrders } = this.props.orders
    return (
      <div id="orders">
        {userOrders ? userOrders.map((order, index) => {
          //convert to date format
          let date = String(new Date(order.created_at)).slice(0, 28)
          return (
            <div>
              <div className="orderflex">
                <div className="orderrow">
                  <div>Order Placed</div>
                  <div className="orderinfo">{date}</div>
                </div>
                <div className="orderrow">
                  <div>Order ID</div>
                  <div className="orderinfo">{order.id}</div>
                </div>
                <div className="orderrow">
                  <div>Status</div>
                  <div className="orderinfo">{order.status}</div>
                </div>
                <div className="orderrow">
                  <div>Total</div>
                  <div className="orderinfo">{Number(order.cart.quantity) * Number(order.cart.price)}</div>
                </div>
              </div>
              <div className='productdetails'>
                <img id="orderimage" src={order.cart.product.img} alt="" />
                <div className='productdetails2'>
                  <div id="orderitems">
                    <div id="itemname">Name: {order.cart.product.name}</div>
                    <div id="itemquantity">Quantity: {order.cart.quantity}</div>
                    <div id="itemquantity">Price: {order.cart.price}</div>
                  </div>
                  <div className="address">
                    <div id="itemname">Address</div>
                    <div>{order.Street}, {order.Apartment} </div>
                    <div>{order.City}, {order.State} {order.zipCode}</div>
                  </div>
                </div>
              </div>
            </div>
          )
           })
          : null}
      </div>

    )
  }
}


const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}


export default connect(mapStateToProps, { loadOrders })(Orders)
