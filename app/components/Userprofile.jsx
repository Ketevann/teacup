import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUser, updateUser } from '../reducers/users'
import Userform from './Userform'
import _ from 'lodash'



const Userprofile = (props) => {
  return (
    <div className="users">
      <Userform id={props.user.id} name={props.user.name} email={props.user.email} orders={props.user.orders} reviews={props.user.reviews} payment={props.user.payment}
        role={props.user.role} auth={props.auth} />
    </div>)
}
const mapState = ({ users, auth }, ownProps) => {
  return {
    user: _.find(users, user => user.id === auth.id),
    auth,

  }
}
const mapDispatch = { deleteUser, updateUser }
export default connect(mapState, mapDispatch)(Userprofile)
