import React from 'react'
import WhoAmI from './WhoAmI'
import { browserHistory, Link } from 'react-router'

export const Login = ({ login, signup }, props) => (

  <div>
    <div id="loginform" className="container">
      <div className="wrapper">
        <form action method="post" name="Login_Form" className="form-signin" onSubmit={evt => {
          evt.preventDefault()
          login(evt.target.username.value, evt.target.password.value)
          evt.target.username.value = ""
          evt.target.password.value = ""
          browserHistory.push('/')
        }}>
          <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
          <h4>Not a memeber ?</h4><span><Link to="/signup">Sign up</Link></span>
          <hr className="colorgraph" /><br />
          <input type="text" className="form-control" name="username" placeholder="Username" required autofocus />
          <input type="password" className="form-control" name="password" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Login</button>  			          </form>
        <a href="api/auth/login/facebook"><div className="fb"></div>

        </a>
      </div>
    </div>




  </div>

)

import { login, signup, thirdPartyLogin } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect(
  state => ({}),
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
