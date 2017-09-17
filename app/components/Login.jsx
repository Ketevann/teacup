import React from 'react'
import WhoAmI from './WhoAmI'
import { browserHistory, Link } from 'react-router'

export class Login extends React.Component {

  constructor() {
    super()

  }


  errorMessage() {
    console.log(' Error!!!!!!!', this.state)
    return (
      <div id="errormessage">Please Try Again</div>
    )
  }
  // redirect(){
  //   console.log(this.props,' redirect')
  //   if (this.props.auth !== null && this.props.auth.id)

  // }
  render() {

    const { login, auth } = this.props
   // if (auth && auth.name) browserHistory('/')
    { console.log(auth, login, 'Login Props', this.props) }
    return (
      <div>
        <div id="loginform" className="container">
          <div className="wrapper">
            <form action method="post" name="Login_Form" className="form-signin" onSubmit={evt => {
              evt.preventDefault()
              login(evt.target.username.value, evt.target.password.value)
              evt.target.username.value = ""
              evt.target.password.value = ""
             // this.redirect()
                          }}>
              <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
              <h4>Not a memeber ?</h4><span><Link to="/signup">Sign up</Link></span>
              <hr className="colorgraph" /><br />
              <input type="text" className="form-control" name="username" placeholder="Username" required autofocus />
              <input type="password" className="form-control" name="password" placeholder="Password" required />

              {
                auth && auth.user === 'error' ?
                this.errorMessage() : null
              }
              {
               // console.log('checkin auth', auth)
               auth && auth.name  ? browserHistory.push('/home') : null
              }
              <button className="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Login</button>
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
  ({ auth }) => ({ auth }),
  { login, signup },
)(Login)



// import React from 'react'

// export const Login = ({ login, signup, thirdPartyLogin }) => (
// <div>
//   <form onSubmit={evt => {
//     evt.preventDefault()

//     login(evt.target.email.value, evt.target.password.value)
//   } }>
//     <input name="email" />
//     <input name="password" type="password" />
//     <input type="submit" value="Login" />
//   </form>
//   <form onSubmit={evt => {
//     evt.preventDefault()

//     signup(evt.target.email.value, evt.target.password.value, evt.target.name.value)
//   } }>
//     <input name="name" />
//     <input name="email" />
//     <input name="password" type="password" />
//     <input type="submit" value="Login" />
//   </form>
//       <br/>

// </div>
// )

// import {login, signup, thirdPartyLogin} from 'APP/app/reducers/auth'
// import {connect} from 'react-redux'

// export default connect(
//   state => ({}),
//   {login, signup, thirdPartyLogin},
// )(Login)
