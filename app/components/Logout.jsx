import React, { Component } from 'react'
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
// Version 1
export const Logout = ({ logout }) => (
  <div>
    <button className="logout" onClick={logout}>Logout</button>
  </div>
)

export default connect(
  state => ({}),
  { logout },
)(Logout)


