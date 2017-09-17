import React from 'react'
import { Link } from 'react-router'
import { checkOut } from '../reducers/cartItems'
import { connect } from 'react-redux'


class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.handleCheckout = this.handleCheckout.bind(this)
  }

  handleCheckout = function (evt) {
    evt.preventDefault()
    this.props.checkOut()
  }

  render() {
    // const divStyle = {
    //   width: 250,
    //   height: 230
    // }
    let cartItems = this.props.cart
    let user = this.props.user
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="header">Your Cart:</h1>

            <table className="table">
              <thead className="thead-inverse">
                <tr>
                  <th>Item Number</th>
                  <th>Quantity</th>
                  <th>Total Per Item</th>
                  <th>Item</th>

                </tr>
              </thead>
              {
                this.props.cart.items ? cartItems.items.map((product, index) => {
                  var image = ""

                  this.props.cart.product.forEach(elem => {
                    if (product.product_id === elem.id)
                      image = elem.img
                  })
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td> {product.quantity} </td>
                        <td> ${product.price * product.quantity}</td>
                        <td> <img id="cartproducts" src={image} /></td>
                      </tr>
                    </tbody>
                  )
                })
                  : null}
            </table>
          </div>
          <div className="col-md-4">
            <h1 id="total">Total: ${
              this.props.cart.items ? cartItems.items.map((item) => item.price * item.quantity)
                .reduce((a, b) => a + b)
                : null} </h1>
            <form onSubmit={this.handleCheckout}>
              <button className="btn btn-default" type="submit"> check out</button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}



export default connect(
  state => ({ cart: state.cartItems, user: state.auth }),
  { checkOut },
)(Cart)


/*



*/
