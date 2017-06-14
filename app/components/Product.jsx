import React from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      reviews: [],
    }
    this.onReviewSubmit = this.onReviewSubmit.bind(this)
  }

  componentWillMount() {
    console.log("NEED PRODUCT ID", this.props)
    axios.get(`/api/reviews/${this.props.routeParams.productId}`)
      .then(res => res.data)
      .then(reviews => {
        console.log('MOUNT prodcut', reviews)
        this.setState({
          reviews: reviews
        })
      })
      .catch(err => console.log(err))
  }

  onReviewSubmit(event) {
    console.log('EVENTTTTTTT TARGEETTT', event.target.productId)
    console.log('WHAT IS THIS ON SUBMIT', this)
    event.preventDefault()
    let reviewInfo = {
      stars: parseInt(event.target.stars.value),
      content: event.target.textContent.value,
      productId: this.props.routeParams.productId
    }
    console.log('RECORDING DATA', reviewInfo)
    fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(reviewInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    browserHistory.push('/products')
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
            <div>
              <h2> Customer Review</h2>

              {this.state.reviews.map((review, i) => {
                console.log('WHAT IS REVIEW???', review)
                return (
                    <li>{review.stars} stars: {review.content} </li>
                )
              }
              )}

            </div>
          <br></br>
          <div className="row col-lg-4">
            <form action={`/api/reviews`} method="post" onSubmit={this.onReviewSubmit}>
            <div className="form-group">
              <label htmlFor="stars">STARS:</label>
              <input size="5" placeholder="Type a number like 5"className="form-control" type="number" id="stars" />
            </div>
            <div className="form-group">
              <label htmlFor="textContent">Your Review:</label>
              <input className="form-control" type="text" id="textContent" style={{width: '30em', height: '5em'}} />
            </div>
              <button className="btn btn-default" type="submit">Add New Review</button>
            </form>
          </div>
          {console.log('BOTTOM BEFORE DIV THIS VAR', this)}
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
