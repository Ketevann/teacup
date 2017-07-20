import React from 'react'

export const Login = ({ login, thirdPartyLogin }) => (
  null
)

import {login, thirdPartyLogin} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login, thirdPartyLogin},
)(Login)
