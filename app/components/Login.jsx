import React from 'react'
import WhoAmI from './WhoAmI'
import { browserHistory, Link } from 'react-router'
import { forgotPasswordBool, forgotPassword, forgotPasswordBoolFalse } from '../reducers/forgot'
import store from '../store'
export class Login extends React.Component {

  errorMessage() {
    console.log(' Error')
    return (
      <div id="errormessage">Please Try Again</div>
    )
  }

  render() {
    const { login, auth, forgot } = this.props
    return (
      <div>
        <div id="loginform" className="container">
          <div className="wrapper">
            <form action method="post" name="Login_Form" className="form-signin" onSubmit={evt => {
              evt.preventDefault()
              login(evt.target.username.value, evt.target.password.value)
              evt.target.username.value = ""
              evt.target.password.value = ""
            }}>
              <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
              <h4>Not a memeber ?</h4><span><Link to="/signup">Sign up</Link></span>
              <hr className="colorgraph" /><br />
              <input type="text" className="form-control" name="username" placeholder="Username" required autofocus />
              <input type="password" className="form-control" name="password" placeholder="Password" required />
             {/*error message for unsuccessful login */}
              {
                auth && auth.user === 'error' ?
                  this.errorMessage() : null
              }
              {/*redirect home after login*/}
              {
                auth && auth.name ? browserHistory.push('/home') : null
              }
              <button className="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Login</button>
              <Link to="/forgotpassword">Forgot Password ?</Link>
              <button className="fblogin btn btn-primary"><a href="api/auth/login/facebook"> Login with Facebook</a></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
import { login, signup, thirdPartyLogin } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect(
  ({ auth, forgot }) => ({ auth, forgot }),
  { login, signup, forgotPasswordBool, forgotPassword, forgotPasswordBoolFalse },
)(Login)


