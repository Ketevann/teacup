import React from 'react'
import { Link } from 'react-router'
import { addToCart } from '../reducers/cartItems'
import { connect } from 'react-redux'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmitItem = this.handleSubmitItem.bind(this)
  }

  handleSubmitItem = function(event){
    event.preventDefault()
    this.props.addToCart()
  }

  render() {
    let product = this.props.product
    let stylePref = {
      width: '100px',
      height: '100px'
    }
    return (

            <div>
                <h1>Product</h1>
                <form onSubmit={this.handleSubmitItem}>
                  <p>{product.name}</p>
                  <img style={stylePref} src={product.imageUrl}/>
                  <p>Price: {product.price}</p>
                  <p> Quantity: <input type="text" name="quantity"/> </p>
                  <button type="submit">Add Product to Cart</button>
                </form>
            </div>
    )
  }
}


const filterProducts = (products, productId) => {
  let productArr = products.filter((product) => product.id===(+productId))
  return productArr[0]
}
export default connect(
  (state, ownProps) => ({product: filterProducts(state.products, ownProps.routeParams.productId)}),
  {addToCart},
)(Product)
