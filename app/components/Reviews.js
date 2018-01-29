import React, { Component } from 'react'
import { } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import { fetchReviews } from 'APP/app/reducers/reviews'

class Reviews extends Component {

  componentWillMount(){
    this.props.fetchReviews()
  }

  render() {
    console.log(this.props, ' props in orders')
    const {userReviews} = this.props.reviews
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

                </tr>
              </tbody>)
          })
            : null}
        </table>
      </div>
    )
  }
}


const mapStateToProps = ({reviews}) => {
  console.log(reviews, 'state')
  return {
    reviews: reviews
  }
}


export default connect(mapStateToProps, {fetchReviews})(Reviews)
