import React, { Component } from 'react'
import { } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { fetchReviews, removeReview } from 'APP/app/reducers/reviews'
import { Link } from 'react-router'
import ReactStars from 'react-stars'

class Reviews extends Component {

  constructor(){
    super()
    this.handleOnRemove.bind(this)
  }
  componentWillMount() {
    this.props.fetchReviews()
  }

  handleOnRemove = function(id) {
    console.log('removed')
    this.props.removeReview(id)
  }


  render() {
    console.log(this.props, ' props in orders')
    const { userReviews } = this.props.reviews
    return (
      <div id="orders">
        <table className="table tablefont">
          <thead align="right" >
            <tr>
              <th className="text-center">Date</th>
              <th className="text-center">Product</th>
              <th className="text-center">Content</th>
              <th className="reviewstar text-center">Stars</th>
            </tr>
          </thead>
          {userReviews ? userReviews.map((review) => {
            let content = review.content,
            date = String(new Date(review.created_at)).slice(0, 28)
            if (review.content && review.content.length > 200)
              content = review.content.slice(0, 200) + '...'
            return (
              <tbody>
                <tr>

                  <td id="reviewdate">{date}</td>
                  <td id="reviewdate">
                  <div id="reviewimgname">
                  <div id="reviewpeoductname">{review.product.name}</div>
                  <img id="reviewpeoductimg" src={review.product.img} alt=""/>
                  </div>
                  </td>
                  <td id="reviewcontent" >{content}</td>
                   <td >
                     {review.stars  ?
                <div className="userreviewcontent userstars ">
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

                   </td>
                  <td className="reviewedit"> <div onClick={() => this.handleOnRemove(review.id)}>Remove </div>
                  <Link className="reviewedit" to={{ pathname: `/products/${review.product_id}#hash`, state: { placeholder: `${review.content}`, star: `${review.stars}` } }}> update </Link></td>

                </tr>
              </tbody>)
          })
            : null}
        </table>
      </div>
    )
  }
}


const mapStateToProps = ({ reviews }) => {
  console.log(reviews, 'state')
  return {
    reviews: reviews
  }
}


export default connect(mapStateToProps, { fetchReviews, removeReview })(Reviews)
