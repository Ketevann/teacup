import React from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import {resetPassword} from '../reducers/forgot'

class ForgotPassword extends React.Component {
  render() {
    {console.log(this.props, ' forgotprops')}
    return (
      <form action="post" onSubmit={(evt) => {
        evt.preventDefault()
        this.props.resetPassword(evt.target.email.value)
      }}>
      <input name="email" type="text"/>
      <input type="submit"/>
      </form>
    )
  }
}
export default connect(
  state => ({}),
  { resetPassword },
)(ForgotPassword)
