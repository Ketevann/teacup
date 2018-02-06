import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUser, updateUser } from '../reducers/users'
import { fetchReviews } from '../reducers/reviews'
import { loadOrders } from '../reducers/orders'
import { whoami } from '../reducers/auth'



import Userform from './Userform'
import _ from 'lodash'


class Userprofile extends Component {

  componentDidMount() {
    this.props.whoami()
    this.props.loadOrders()
    this.props.fetchReviews();
  }
  renderForm() {
    const { id, name, email, role } = this.props.auth
    const { userOrders } = this.props.orders
    const { userReviews } = this.props.reviews
    if (userOrders && userReviews) {
      return (
        <Userform id={this.props.auth.id} name={this.props.auth.name} email={this.props.auth.email} orders={this.props.orders.userOrders} reviews={this.props.reviews.userReviews} payment={null}
          role={this.props.auth.role} auth={this.props.auth} />
      )
    }
  }
  render() {
    if (!this.props.auth) return null
    return (
      <div className="users">
        {this.renderForm()}
      </div>
    )
  }
}
const mapState = (state, ownProps) => {
  const { auth, users, orders, reviews } = state
  return {
    user: _.find(users, user => user.id === auth.id),
    auth,
    orders,
    reviews
  }
}
const mapDispatch = { deleteUser, updateUser, loadOrders, fetchReviews, whoami }
export default connect(mapState, mapDispatch)(Userprofile)
