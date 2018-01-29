import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUser, updateUser } from '../reducers/users'
import Userform from './Userform'
import _ from 'lodash'



const Userprofile = (props) => {
   console.log(props, 'props', props.auth)
   if (!props.auth) return null
  return (
    <div className="users">
      <Userform id={props.auth.id} name={props.auth.name} email={props.auth.email} orders={props.orders.userOrders} reviews={props.reviews.userReviews} payment={null}
        role={props.auth.role} auth={props.auth} />
    </div>)
}
const mapState = ({ users, auth, orders, reviews }, ownProps) => {
  console.log(orders,' irders', users,  reviews, auth)
  return {
    user: _.find(users, user => user.id === auth.id),
    auth,
    orders,
    reviews
  }
}
const mapDispatch = { deleteUser, updateUser }
export default connect(mapState, mapDispatch)(Userprofile)
