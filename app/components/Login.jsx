import React from 'react'
import WhoAmI from './WhoAmI'
export const Login = ({ login, thirdPartyLogin }) => (
  <div id="loginform">
    <form onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
      <input name="username" />
      <br></br>
      <input name="password" type="password" />
      <input type="submit" value="Login" />
    </form>
    <br/>
      <button onClick={evt => { thirdPartyLogin('google')}}>log in with google</button>
      <button onClick={evt => { thirdPartyLogin('github')}}>log in with github</button>
      <button onClick={evt => { thirdPartyLogin('facebook')}}>log in with facebook</button>
      <WhoAmI />
  </div>
)

import {login, thirdPartyLogin} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login, thirdPartyLogin},
)(Login)
