import React from 'react'
import { Link } from 'react-router'
import { getOrMakeOrder } from '../reducers/cartItems'
import { connect } from 'react-redux'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      productId: 1
    }
    this.handleSubmitItem = this.handleSubmitItem.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
}


  handleSubmitItem = function(event){
    event.preventDefault()
    console.log(this.props, 'propzzz')
    let itemInfo = {quantity: this.state.quantity, productId: this.props.product.id, price: Number(this.props.product.price), userId: 1}
    this.props.getOrMakeOrder(itemInfo)
  }

  handleQuantityChange = function(event){
    this.setState({quantity: Number(event.target.value)})
  }

  // onReviewSubmit(event) {
  //   event.preventDefault()
  //   let reviewInfo = {
  //     username: event.target.name.value,
  //     content: event.target.content.value
  //   }
  //   this.props.addReview(reviewInfo)
  // }


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
                  <p> Quantity: <input type="text" onChange={this.handleQuantityChange}/> </p>
                  <button type="submit">Add Product to Cart</button>
                </form>

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


const filterProducts = (products, productId) => {
  let productArr = products.filter((product) => product.id===(+productId))
  return productArr[0]
}

export default connect(
  (state, ownProps) => ({product: filterProducts(state.products, ownProps.routeParams.productId)}),
  {getOrMakeOrder},
)(Product)
