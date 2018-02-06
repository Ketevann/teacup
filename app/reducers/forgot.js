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
    return { ...passwordState, password: true }
    case EMAILSENT:
    return { ...passwordState, password: false, confirmation: true, resetform: true  }
    case RESET:
    return { ...passwordState, password: false, confirmation: false, reset: action.status, resetform: true  }
  }
  return passwordState
}


export const forgotPassword = (email) => {
  return dispatch =>
    axios.post('/forgotPassword', { email })
      .then((res) => console.log('forgot'))
}

export const resetPassword = (credentials) => {
  return dispatch =>
    axios.post('/forgotPassword/reset', credentials)
      .then((res) => dispatch(confirmReset(res.data)))
      .catch(err => console.log(err))
}


export default forgotReducer
