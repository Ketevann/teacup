import React from 'react'
import { Link } from 'react-router'
import { checkOut, removeProduct, updateProduct } from '../reducers/cartItems'
import { connect } from 'react-redux'


class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleCheckout = function (evt) {
    evt.preventDefault()
    const { id } = this.props.user
    console.log('this.pros', this.props.user)
    this.props.checkOut(id)
  }
  handleRemove(item) {
    console.log('handle remove', item)
    this.props.removeProduct(item.product_id, item.order_id)
  }

  handleSubmit = function(evt, item) {
    evt.preventDefault()
    let quantity = evt.target.quantity.value
    console.log('handle submit', item, evt.target.quantity, evt.target,  evt.target.quantity.value)
    this.props.updateProduct(evt.target.quantity.value, item.product_id, item.order_id)

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
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Update</th>
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
                        <td> {item.product.name} </td>
                        <td> {item.product.price} </td>
                        <td> {item.quantity} </td>

                        <div>


                         <form action="" onSubmit={(evt) => this.handleSubmit(evt, item)}>
                            <input className="updateinput" name="quantity" onclick={() => console.log('clicked input ')} type="text" />
                            <input className="btn btn-default updatebtn" type="text" type='submit' value="Update" />
                          </form>



                          <div className="removebtn">
                          <div onClick={() => this.handleRemove(item)}>Remove </div>
                          </div>
                        </div>
                         <td> ${item.price}</td>
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
  { checkOut, removeProduct, updateProduct },
)(Cart)


/*



*/
