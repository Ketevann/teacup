import React from 'react'
import { Link } from 'react-router'
import { checkOut, removeProduct, updateProduct } from '../reducers/cartItems'
import { connect } from 'react-redux'
import {
  Nav, Navbar, NavItem, MenuItem, NavDropdown,
  FormGroup, FormControl, ControlLabel,
  Button, Popover

} from 'react-bootstrap';

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleCheckout = function (evt) {
    evt.preventDefault()
    const { id } = this.props.user
    console.log('this.pros', this.props.user)
    if (id)
    this.props.checkOut(id)
    else this.setState({ clicked: true })
  }
  handleRemove(item) {
    console.log('handle remove', item)
    this.props.removeProduct(item.product_id, item.order_id)
  }

  handleSubmit = function (evt, item) {
    evt.preventDefault()
    let quantity = evt.target.quantity.value
    console.log('handle submit', item, evt.target.quantity, evt.target, evt.target.quantity.value)
    this.props.updateProduct(evt.target.quantity.value, item.product_id, item.order_id)


  }
  componentWillMount() {
    if (this.props.user && this.props.user.userId) {
      this.setState({ clicked: false })
    }
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
      <div className="container cart">
        <div className="row">
          <div className="col-md-9">
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
                        <td> ${item.price * item.quantity}</td>
                        <td> <img id="cartproducts" src={image} /></td>

                      </tr>
                    </tbody>
                  )
                })
                  : null}
            </table>
          </div>
          <div className="col-md-3">
            <h1 id="total">Total: ${
              this.props.cart.items && this.props.cart.items.length > 0 ? cartItems.items.map((item) => item.price * item.quantity)
                .reduce((a, b) => a + b)
                : null} </h1>
            <form onSubmit={this.handleCheckout}>
              <button className="btn btn-default" type="submit"> check out</button>
            </form>

          </div>
        </div>
        {this.state.clicked  && !this.props.user.userId ?
        <div style={{ height: 120 }}>
          <Popover
            id="popover-basic"
            placement="right"
            positionLeft={500}
            positionTop={50}
            title="Checkout"
          >
            Please  <Link to="/login"><strong>login</strong></Link> or <Link to="/signup"> <strong>sign up</strong></Link>.
  </Popover>
        </div> : null}
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
