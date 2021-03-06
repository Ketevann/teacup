import React from 'react'
import WhoAmI from './WhoAmI'
import { browserHistory, Link } from 'react-router'

export class SignUp extends React.Component {

  constructor(){
    super()
    this.state = {passwordError : null}
  }
  errorMessage() {
  return (
    <div id="errormessage">Please Try Again</div>
  )
}
render(){
  const {signup, auth} = this.props
  return (
    <div>
      <div id="loginform" className="container">
        <div className="wrapper">
          <form action method="post" name="Login_Form" className="form-signin" onSubmit={evt => {
            evt.preventDefault()
            if(evt.target.password.value.length < 6) {
              this.setState({passwordError: 'The password needs to be at least 6 characters long'})
            }
            else {

            signup(evt.target.email.value, evt.target.password.value, evt.target.name.value)
            evt.target.email.value = ""
            evt.target.name.value = ""
            evt.target.password.value = ""
            }
          }}>
            <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
            <h4>Already a memeber ?</h4><span><Link to="/login">Login </Link></span>
            <hr className="colorgraph" /><br />
            <input type="text" className="form-control" name="name" placeholder="Username" required autofocus />
            <input className="form-control" name="email" placeholder="email" required autofocus />
            <input onChnage={() => this.setState({passwordError: null})} type="password" className="form-control" name="password" placeholder="Password" required />
            {
              auth && auth.user === 'error' ?
                this.errorMessage() : null
            }
            {
              auth && auth.name ? browserHistory.push('/home') : null
            }
            {this.state.passwordError?
              <div id="password-error">{this.state.passwordError}</div>
          :null }
            <button className="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Sign Up</button>
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
  ({ auth }) => ({ auth }),
  { signup },
)(SignUp)


