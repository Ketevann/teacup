import React from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'
import { getOrMakeOrder, addToCart } from '../reducers/cartItems'
import { postReviews, getProductReviews } from '../reducers/reviews'
import { connect } from 'react-redux'
import ReactStars from 'react-stars'


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

  handleSubmitItem = function (event, product) {
    event.preventDefault()
    console.log(this.props)
    const { id, price } = product
    let itemInfo = { quantity: this.state.quantity, productId: id, price, userId: this.props.auth.id }
    //this.props.addToCart(itemInfo)
    this.props.getOrMakeOrder(itemInfo)
  }


  handleQuantityChange = function (event) {
    this.setState({ quantity: Number(event.target.value) })
  }

  componentWillMount() {
    console.log('gettin product reviews ')
    let productId = this.props.routeParams.productId.replace('#hash', '')
    this.props.getProductReviews(this.props.routeParams.productId)
    // axios.get(`/api/reviews/${this.props.routeParams.productId}`)
    //   .then(res => res.data)
    //   .then(reviews => {
    //     this.setState({
    //       reviews: reviews
    //     })
    //   })
    //   .catch(err => console.log(err))
  }

  onReviewSubmit(event, title) {
    event.preventDefault()
    let productId = this.props.routeParams.productId.replace('#hash', '')

    let reviewInfo = {
      content: event.target.textContent.value,
      productId: productId,
      userId: this.props.auth.id
    }
    this.props.postReviews(reviewInfo)
    event.target.textContent.value = ''
    // fetch("/api/reviews", {
    //   method: "POST",
    //   body: JSON.stringify(reviewInfo),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
  }
  ratingChanged(newRating) {
    console.log(newRating)
   let productId = this.props.routeParams.productId.replace('#hash', '')

    this.props.postReviews({ stars: newRating, productId: productId })

  }


  render() {
    let placeholder = ""
    if (this.props.location.state && this.props.location.state.placeholder) {
      placeholder = this.props.location.state.placeholder
    }

    let stars = this.props.reviews.all.map(el => el.star).reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    },
      0
    )
    const { all } = this.props.reviews
    let count = 0, sum = 0
    for (var i = 0; i < all.length; i++) {
      if (all[i].stars !== null) {
        sum += all[i].stars
        count++
      }
    }
    stars = sum / count
    // const divStyle = {
    //   width: 450,
    //   height: 430
    // }\let Oneproduct
    let Oneproduct,
    productId = this.props.ownProps.routeParams.productId.replace('#hash', '')
    console.log(this.props, ' in product', stars);
    {
      this.props.products ?
      Oneproduct = this.props.products.all.filter(product => {
        console.log(product, productId)
        if (product.id == productId) {
          return product
        }
      })

      : null
    }
    console.log(Oneproduct, '************', 'placeholder', placeholder)
    let product = Oneproduct[0]
    return (

      <div className="singleproduct flex">

        <form onSubmit={ (event) => this.handleSubmitItem(event, product)}>
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
        <br></br>
        <div>

          <h2 className="singleproductfont">Customer Review</h2>

          {this.props.reviews.all.map((review, i) => {
            return (
              <div id="userreview">
              <div className="userreviewcontent">{review.user.name}:</div>

              {review.stars  ?
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

      </div>


    )
  }
}

const mapStateToProps = (state, ownProps) => {


  return {
    products: state.products,
    auth: state.auth,
    reviews: state.reviews,
    ownProps
  }
}

const filterProducts = (products, productId) => {
  console.log(products, ' product -------->s')
  let productArr = products.all.filter((product) => product.id === (+productId))
  return productArr[0]
}

export default connect(
  mapStateToProps,
  { getOrMakeOrder, addToCart, postReviews, getProductReviews },
)(Product)
