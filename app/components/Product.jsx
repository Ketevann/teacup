import React from 'react'
import { Link } from 'react-router'

class Product extends React.Component {
  constructor(props) {
    super(props)
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
                <p>{product.name}</p>
                <img style={stylePref} src={product.imageUrl}/>
                <p>Price: {product.price}</p>
                <button>Add Product to Cart</button>
            </div>
         
       

    )
  }
}

import {connect} from 'react-redux'
const filterProducts = (products, productId) => {
  console.log('products', products)
  console.log('prodId', productId)
  console.log('filtering!!!')
  var productArr = products.filter((product) => product.id===(+productId))
  console.log(productArr)
  return productArr[0]
}
export default connect(
  (state, ownProps) => ({product: filterProducts(state.products, ownProps.routeParams.productId)}),
  {},
)(Product)
