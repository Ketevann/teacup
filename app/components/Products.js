import React from 'react'
import { Link } from 'react-router'

class Products extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('in products?????')
    let products = this.props.products
    console.log(products)
    let stylePref = {
      width: '100px',
      height: '100px'
    }
    return (

      <div>
          <h1>Products</h1>
          {
            products.length && products.map((product) => {
              return (
                <div>
                <Link to={`/products/${product.id}`}>
                  <p>{product.name}</p>
                  <img style={stylePref} src={product.imageUrl}/>
                  <p>Price: {product.price}</p>
                </Link>
                </div>
                )
            })
          }
      </div>

    )
  }
}

import {connect} from 'react-redux'

export default connect(
  state => ({products: state.products}),
  {},
)(Products)
