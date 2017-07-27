import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
  console.log(action, 'usaaa')
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
      .then(() => dispatch(whoami()))
      .catch(console.error)

export const thirdPartyLogin = (provider) =>
  dispatch =>
     axios.get(`/api/auth/login/${provider}`)
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>{
    console.log("looog")
    return axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))
  }
export const signup = (email, password, name) =>
    dispatch =>
      axios.post('/api/auth/signup',
        {email, password, name})
        .then(() => dispatch(whoami()))
        .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
