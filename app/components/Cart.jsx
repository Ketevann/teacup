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
    const {id} = this.props.user
    console.log('this.pros', this.props.user)
    this.props.checkOut(id)
  }

  render() {
    // const divStyle = {
    //   width: 250,
    //   height: 230
    // }
    console.log(this.props, 'in cart component')
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
                this.props.cart.items ? cartItems.items.map((item, index) => {
                  var image = ""

                  //this.props.cart.items.forEach(singleProduct => {
                  //  if (elem.product_id === singleProduct.product.id)
                      image = item.product.img
                 // })
                  return (
                    <tbody
                    key={item.id}
                    >
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td> {item.quantity} </td>
                        <td> ${item.price * item.quantity}</td>
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
              this.props.cart.items && this.props.cart.items.length > 0 ? cartItems.items.map((item) => item.price * item.quantity)
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
