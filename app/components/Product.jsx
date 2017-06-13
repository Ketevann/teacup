import React from 'react'
import { Link } from 'react-router'

class Product extends React.Component {
  constructor(props) {
    super(props)
  }
  onReviewSubmit(event) {
    event.preventDefault()
    let reviewInfo = {
      username: event.target.name.value,
      content: event.target.content.value
    }
    this.props.addReview(reviewInfo)
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
          <br></br>
          <div className="row col-lg-4">
            <form action={`/api/reviews`} method="post" onSubmit={this.onReviewSubmit}>
            <div className="form-group">
              <label htmlFor="name">User Name:</label>
              <input size="20" className="form-control" type="text" id="name" name="username"/>
            </div>
            <div className="form-group">
              <label htmlFor="textContent">Your Review:</label>
              <input className="form-control" type="text" id="textContent"style={{width: '30em', height: '5em'}} />
            </div>
              <button className="btn btn-default" type="submit">Add New Review</button>
            </form>
          </div>
      </div>
    )
  }
}

import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => ({
  addReview: (questionInfo) => {
    dispatch((questionInfo))
  }
})

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
