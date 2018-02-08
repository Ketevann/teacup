import React from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'
import { getOrMakeOrder, addToCart } from '../reducers/cartItems'
import { postReviews, getProductReviews } from '../reducers/reviews'
import { connect } from 'react-redux'
import ReactStars from 'react-stars'
import { Modal, Button } from 'react-bootstrap'
const removeHash = (keyword) => {
  return keyword.replace('#hash', '')
}

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      productId: 1,
      reviews: [],
      error: null,
      addedtocart: null
    }
    this.onReviewSubmit = this.onReviewSubmit.bind(this)
    this.handleSubmitItem = this.handleSubmitItem.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  handleSubmitItem = function (event, product) {
    event.preventDefault()
    const { id, price } = product

    if (Number.isInteger(this.state.quantity) === false || this.state.quantity == 0){
       this.setState({ error: `Invalid value` })
    }
    else if (this.state.quantity > product.inventory) {

      this.setState({ error: `Quantity exceeds the available stock on hand max(${product.inventory})` })
    }
    else {
      this.setState({ error: null, addedtocart: true })

      let itemInfo = { quantity: this.state.quantity, productId: id, price, userId: this.props.auth.id }
      //this.props.addToCart(itemInfo)
      this.props.getOrMakeOrder(itemInfo)
    }
  }


  handleQuantityChange = function (event) {
    this.setState({ quantity: Number(event.target.value) })
  }

  componentWillMount() {
    //remove hash from uri
    let productId = removeHash(this.props.routeParams.productId)
    //get all product reviews
    this.props.getProductReviews(this.props.routeParams.productId)
  }

  onReviewSubmit(event, title) {
    event.preventDefault()
    //remove hash from uri
    let productId = removeHash(this.props.routeParams.productId)

    let reviewInfo = {
      content: event.target.textContent.value,
      productId: productId,
      userId: this.props.auth.id
    }
    // post a new review
    this.props.postReviews(reviewInfo)
    //clear review text area
    event.target.textContent.value = ''
  }
  // post a new star rating
  ratingChanged(newRating) {
    let productId = removeHash(this.props.routeParams.productId)
    this.props.postReviews({
      stars: newRating, productId: productId, userId: this.props.auth.id
    })
  }


  render() {
    let placeholder = "Type your review..."
    //if user is not updating the review, defaults to "Type your review..."
    //if placeholder is in props defaults to user's review
    if (this.props.location.state && this.props.location.state.placeholder) {
      placeholder = this.props.location.state.placeholder
    }
    let stars = this.props.reviews.all.map(el => el.star).reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    },
      0
    )

    //sums and finds an average of all star reviews for the product
    const { all } = this.props.reviews
    let count = 0, sum = 0
    for (var i = 0; i < all.length; i++) {
      if (all[i].stars !== null) {
        sum += all[i].stars
        count++
      }
    }
    stars = sum / count
    //filters out current product from all prdoucts
    let Oneproduct,
      productId = removeHash(this.props.routeParams.productId)
    {
      this.props.products ?
        Oneproduct = this.props.products.all.filter(product => {
          if (product.id == productId) {
            return product
          }
        })

        : null
    }
    //current product
    let product = Oneproduct[0]
    return (
      <div className="singleproduct flex">
        <form onSubmit={(event) => this.handleSubmitItem(event, product)}>
          {product ?
            <div className="singleproductfont singleproductinfo">
              <p >{product.name}</p>
              <p>Price: ${product.price}</p>
              <img id="singleproducts" src={product.img} />
            </div>
            : null}
          <div className="singleproduct stars">
            {stars !== 0 ?
              <ReactStars
                count={5}
                size={18}
                color2={'#ffd700'}
                value={stars}
                edit={false}
              />
              :
              <ReactStars
                count={5}
                size={18}
                color2={'#ffd700'}
                edit={false}
              />
            }
          </div>
          <p className="singleproductfont"> Quantity: <input type="text" onChange={this.handleQuantityChange} /> </p>
          <button className="btn btn-default addproduct" type="submit">Add Product to Cart</button>
        </form>
        {this.state.error ?
          <div className="outofstock">{this.state.error}</div>
          : null}
        <br></br>
        <div>
          <h2 className="singleproductfont">Customer Review</h2>
          {this.props.reviews.all.map((review, i) => {
            return (
              <div id="userreview">
                <div className="userreviewcontent">{review.user.name}:</div>
                {review.stars ?
                  <div className="userreviewcontent userstars">
                    <ReactStars
                      count={5}
                      size={10}
                      color2={'#ffd700'}
                      value={review.stars}
                      edit={false}
                    />
                  </div>
                  :
                  <div className="userreviewcontent userstars">
                    <ReactStars
                      count={5}
                      size={10}
                      color2={'#ffd700'}
                      edit={false}
                    />
                  </div>
                }
                <div className="reviewcontent"> {review.content} </div>
              </div>
            )
          }
          )}
        </div>
        <br></br>
        <div >
          {/*only logged in users can review products*/}
          {this.props.auth && this.props.auth.id ?
            <form id="reviewform" action={`/api/reviews`} method="post" onSubmit={this.onReviewSubmit}>
              <div className="form-group">
              </div>
              <div className="form-group">
                <label htmlFor="textContent" className="singleproductfont">Your Review:</label>
                <div>
                  <div id="hash"></div>
                  <div className="ratestars">
                    <ReactStars
                      onChange={this.ratingChanged.bind(this)}
                      count={5}
                      size={24}
                      color2={'#ffd700'} />
                  </div>
                  <textarea id="textarea" name="textContent" id="" cols="30" rows="10">{placeholder}</textarea>
                </div>
              </div>
              <button className="singleproductfont btn btn-default" type="submit">Add New Review</button>
            </form>
            : null}
        </div>
        {this.state.addedtocart ?
          <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title><strong>Cart</strong></Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <div className="cartitemsmodal">
                   <div> {product.name} was added to your cart</div>
                   <div>Quantity: <strong>{this.state.quantity}</strong></div>
                   <div>Price: <strong>${product.price}</strong></div>
                   <img id="cartimg" src={product.img} alt=""/>
                    </div>

              </Modal.Body>

              <Modal.Footer>
                <Button onClick={() => this.setState({addedtocart: null})}>Close</Button>
                <Link to="/cart"><Button bsStyle="primary">go to cart</Button></Link>
              </Modal.Footer>
            </Modal.Dialog>
          </div> : null}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    auth: state.auth,
    reviews: state.reviews,
    ownProps,
    cart: state.cartItems
  }
}

export default connect(
  mapStateToProps,
  { getOrMakeOrder, addToCart, postReviews, getProductReviews },
)(Product)
