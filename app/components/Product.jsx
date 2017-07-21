import React from 'react'





import { Link, browserHistory } from 'react-router'
import axios from 'axios'

import { getOrMakeOrder } from '../reducers/cartItems'
import { addToCart } from '../reducers/cartItems'

import { connect } from 'react-redux'


class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      productId: 1,
      reviews: []
    }
    this.onReviewSubmit = this.onReviewSubmit.bind(this)
    this.handleSubmitItem = this.handleSubmitItem.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

   handleSubmitItem = function(event){
    event.preventDefault()
    let itemInfo = {quantity: this.state.quantity, productId: this.props.product.id, price: Number(this.props.product.price), userId: 1}
    this.props.getOrMakeOrder(itemInfo)
  }


  handleQuantityChange = function(event){
    this.setState({quantity: Number(event.target.value)})
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

  onReviewSubmit(event, title) {
    event.preventDefault()
    let reviewInfo = {
      stars: parseInt(title),
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
     const divStyle = {
      width: 450,
      height: 430
    }
    let product = this.props.product

    return (
            <div className="singleproduct">
                <form onSubmit={this.handleSubmitItem}>
                  <p className="productinfo">{product.name}</p>
                  <p className="productinfo">Price: {product.price}</p>
                  <img style={divStyle} src={product.img} />
                  <p> Quantity: <input type="text" onChange={this.handleQuantityChange}/> </p>
                  <button className="btn btn-default addproduct" type="submit">Add Product to Cart</button>
                </form>
              <br></br>
            <div>
              <h2> Customer Review</h2>

              {this.state.reviews.map((review, i) => {
                return (
                    <li>{review.stars} stars: {review.content} </li>
                )
              }
              )}

            </div>
          <br></br>
        <div className="row col-lg-4">

            <form id="reviewform" action={`/api/reviews`} method="post" onSubmit={this.onReviewSubmit}>
            <div className="form-group">
              <label htmlFor="stars">STARS:</label>
              <input size="5" placeholder="Type a number like 5"className="form-control" type="number" id="stars" />
            </div>
            <div className="form-group">
              <label htmlFor="textContent">Your Review:</label>
              <input className="form-control" type="text" id="textContent"  />
            </div>
              <button className="btn btn-default" type="submit">Add New Review</button>
            </form>
          </div>
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
  {getOrMakeOrder},
)(Product)
