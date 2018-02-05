import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUser, updateUser } from '../reducers/users'
import { fetchReviews } from '../reducers/reviews'
import { loadOrders } from '../reducers/orders'


import Userform from './Userform'
import _ from 'lodash'



class Userprofile extends Component {

  componentWillMount() {
    this.props.loadOrders()
    this.props.fetchReviews();
  }
  render() {

    { console.log(this.props, 'this.props', this.props.auth) }
    if (!this.props.auth) return null
    return (
      <div className="users">
        <Userform id={this.props.auth.id} name={this.props.auth.name} email={this.props.auth.email} orders={this.props.orders.userOrders} reviews={this.props.reviews.userReviews} payment={null}
          role={this.props.auth.role} auth={this.props.auth} />
      </div>)
  }
}
const mapState = (state, ownProps) => {
  console.log(state)
  const { auth, users, orders, reviews } = state
  return {
    user: _.find(users, user => user.id === auth.id),
    auth,
    orders,
    reviews
  }
}
const mapDispatch = { deleteUser, updateUser, loadOrders, fetchReviews }
export default connect(mapState, mapDispatch)(Userprofile)
