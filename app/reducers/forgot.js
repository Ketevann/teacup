import axios from 'axios';
const FORGOT = 'FORGOT'
const EMAILSENT = 'EMAILSENT';
const RESET = 'RESET';




export const forgotPasswordBool = () => ({type: 'FORGOT'})
export const forgotPasswordBoolFalse = () => ({type: EMAILSENT})
export const confirmReset = (status) => ({type: RESET, status})

const INTITIALSTATE = {password: false, confirmation: false, reset: null, resetform: false}

const forgotReducer = (passwordState = INTITIALSTATE, action) => {
  switch (action.type) {
    case FORGOT:
    console.log(action)
    return { ...passwordState, password: true }
    case EMAILSENT:
    return { ...passwordState, password: false, confirmation: true, resetform: true  }
    case RESET:
    console.log(action, action)
    return { ...passwordState, password: false, confirmation: false, reset: action.status, resetform: true  }
  }
  return passwordState
}


export const forgotPassword = (email) => {
  console.log(email, ' here we are in reset')
  return dispatch =>
    axios.post('/forgotPassword', { email })
      .then((res) => console.log('some'))
}

export const resetPassword = (credentials) => {
  console.log(credentials, ' here we are in reset')
  return dispatch =>
    axios.post('/forgotPassword/reset', credentials)
      .then((res) => dispatch(confirmReset(res.data)))
      .catch(err => console.log(err))
}


export default forgotReducer
