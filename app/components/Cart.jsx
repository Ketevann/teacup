import React from 'react'
import { Link } from 'react-router'
import { checkOut } from '../reducers/cartItems'
import {connect} from 'react-redux'


class Cart extends React.Component {
  constructor(props) {
    super(props)

  this.handleCheckout = this.handleCheckout.bind(this)  
  }
  
  handleCheckout = function(evt){
      console.log('handling checkout')
      evt.preventDefault()
      this.props.checkOut()
      this.handleCheckout = this.handleCheckout.bind(this)
  }

  render() {
    let cartItems = this.props.cart
    let user = this.props.user
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <h1>Your Cart:</h1>
             {
            cartItems.length && cartItems.map((product, index) => {
              return (
                <div key={product.id} className="col-md-4">
                  
                  <p>Item {index+1}: {product.quantity} : ${product.price * product.quantity}</p>
                </div>
                )
            })
          }
          </div>
          <div className="col-md-8">
          <h1>Total: ${
                        cartItems.length && cartItems.map((item) => item.price * item.quantity)
                        .reduce((a,b) => a+b)
                    } </h1>

        <form onSubmit={this.handleCheckout}>
            <button type="submit"> check out</button>
        </form>
      </div>
      </div>
      </div>

    )
  }
}



export default connect(
  state => ({cart: state.cartItems, user: state.auth}),
  {checkOut},
)(Cart)


/*



*/