import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { resetPassword } from '../reducers/forgot'

class ResetPassword extends React.Component {
  render() {

    const { forgot } = this.props
    return (
      <div>
      {
        forgot.reset && forgot.reset.changed ?
          <div id="resetmsg">Password has been reset ! Plase login with you new password by clicking
          <Link to="/login"> here</Link></div>
          :
          <div>

        <div id="loginform" className="container">
              <div className="wrapper">
                <form action method="post" name="Login_Form" className="form-signin" onSubmit={(evt) => {
                  evt.preventDefault()
                  this.props.resetPassword({ password: evt.target.password.value, token: this.props.token })
                  evt.target.password.value = ''
                }}>
                  <h3 className="form-signin-heading">Please Enter Your Email New Password</h3>
                  <hr className="colorgraph" /> <br />
                  <input type="password" className="form-control" name="password" placeholder="Password" required />
                  {forgot.reset && !forgot.reset.changed ?
            <h4>Password Could not be reset</h4> : null}
                  <button className="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Submit</button>
                </form>
              </div>
            </div>
                  </div>

            }
            </div>
    )
      }
}


  const mapStatetoProps = (state, ownProps) => {
    return {
      token: ownProps.routeParams.token,
      forgot: state.forgot
    }
  }
  export default connect(
    mapStatetoProps,
    { resetPassword },
  )(ResetPassword)
