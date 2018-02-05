import React, { Component } from 'react'
import { } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { fetchReviews, removeReview } from 'APP/app/reducers/reviews'
import { Link } from 'react-router'

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
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th>Review ID</th>
              <th>Date</th>
              <th>Content</th>
            </tr>
          </thead>
          {userReviews ? userReviews.map((review) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{review.id}</th>
                  <td >{review.created_at}</td>
                  <td >{review.content}</td>
                   <button onClick={() => this.handleOnRemove(review.id)}>Remove </button>
                  <Link to={`/products/${review.product_id}#hash`}> <td >update</td> </Link>

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
