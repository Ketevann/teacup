import React from 'react'
import { Link } from 'react-router'
import { checkOut } from '../reducers/cartItems'
import { connect} from 'react-redux'


class Cart extends React.Component {
  constructor(props) {
    super(props)

  this.handleCheckout = this.handleCheckout.bind(this)  
  }
  
  handleCheckout = function(evt){
      evt.preventDefault()
      this.props.checkOut()
  }

  render() {
    let cartItems = this.props.cart
    let user = this.props.user
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <h1>Your Cart:</h1>
          
          
        <table className="table">

          <thead className="thead-inverse">

            <tr>


              <th>Item Number</th>
              <th>Quantity</th>
              <th>Total Per Item</th>


            </tr>

          </thead>
          
       
              {
              cartItems.length && cartItems.map((product, index) => {
                return (
                     <tbody>
                      <tr>
             
                    <th scope="row">{index + 1}</th>
                    <td> {product.quantity} </td>
                    <td> ${product.price * product.quantity}</td>
               
                   </tr>
            </tbody>
                  )
              })
            }
           
            </table>
          </div>

          <div className="col-md-8">
          <h1>Total: ${
                        cartItems.length && cartItems.map((item) => item.price * item.quantity)
                        .reduce((a,b) => a+b)
                    } </h1>

        <form onSubmit={this.handleCheckout}>
            <button className="btn-success" type="submit"> check out</button>
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