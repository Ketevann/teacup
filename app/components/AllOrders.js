import React, { Component } from 'react'
import { } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { loadAllOrders, loadSingleUserOrders } from 'APP/app/reducers/orders'

class AllOrders extends Component {

  componentDidMount() {
    this.props.loadAllOrders()
  }

  render() {
    const { allOrders } = this.props.orders
    return (
      <div id="orders">
        {allOrders ? allOrders.map((elem, index) => {
          //convert to date format
          let date = String(new Date(elem.order.created_at)).slice(0, 28)
          return (
            <div>
              <div className="orderflex">
                <div className="orderrow allorders">
                  <div>Order Placed</div>
                  <div className="orderinfo">{date}</div>
                </div>
                <div className="orderrow allorders">
                  <div>Order ID</div>
                  <div className="orderinfo">{elem.order.id}</div>
                </div>
                <div className="orderrow allorders">
                  <div>Status</div>
                  <div className="orderinfo">{elem.order.status}</div>
                </div>
                <div className="orderrow allorders">
                  <div>Total</div>
                  <div className="orderinfo">{Number(elem.quantity) * Number(elem.price)}</div>
                </div>
              </div>
              <div className='productdetails'>
                <img id="orderimage" src={elem.product.img} alt="" />
                <div className='productdetails2'>
                  <div id="orderitems">
                    <div id="itemname">Name: {elem.product.name}</div>
                    <div id="itemquantity">Quantity: {elem.quantity}</div>
                    <div id="itemquantity">Price: {elem.price}</div>
                  </div>
                    <div id="userdetails">
                    <div id="userheader">User</div>
                    <div id="userid">id: {elem.order.user.id}</div>
                    <div id="username">name: {elem.order.user.name}</div>
                    <div id="useremail">email: {elem.order.user.email}</div>
                  </div>
                  <div className="address">
                    <div id="itemname">Address</div>
                    <div>{elem.order.Street}, {elem.order.Apartment} </div>
                    <div>{elem.order.City}, {elem.order.State} {elem.order.zipCode}</div>
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


export default connect(mapStateToProps, { loadAllOrders })(AllOrders)
