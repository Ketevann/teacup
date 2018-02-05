import axios from 'axios'
import { browserHistory, Link } from 'react-router'
import {getCart} from './cartItems'
const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'

export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (email, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {email, password})
      .then((user) =>
      {
      return dispatch(whoami())

  })
      .catch(() => dispatch(authenticated({user: 'error'})))


export const logout = () =>
  dispatch =>{
    console.log(' in logout ')
   return axios.delete('/api/notlogged')
   .then(() => {
     return axios.post('/api/auth/logout')
   })
      .then(() =>
      dispatch(whoami())
      )
      .then(() => {
        dispatch(getCart([]))
      })
      .catch(() => dispatch(whoami()))
  }
export const signup = (email, password, name) =>
    dispatch =>
      axios.post('/api/auth/signup',
        {email, password, name})
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(authenticated({user: 'error'})))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data

        dispatch(authenticated(user))

      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
