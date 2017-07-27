import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUser, updateUser } from '../reducers/users'
import Userform from './Userform'
import _ from 'lodash'



const SingleUser = (props) => {
  if (!props.user) return null
  return (
    <div className="users">
      <Userform id={props.user.id} name={props.user.name} email={props.user.email} orders={props.user.orders} reviews={props.user.reviews} payment={props.user.payment}
        role={props.user.role} />
    </div>)

}
const mapState = ({ users, auth }, ownProps) => {
  const paramId = Number(ownProps.params.userId)
  return {
    user: _.find(users, user => user.id === paramId),
    users,
    auth

  }
}
const mapDispatch = { deleteUser, updateUser }
export default connect(mapState, mapDispatch)(SingleUser)
