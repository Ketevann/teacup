import axios from 'axios';
const FORGOT = 'FORGOT'

const INTITIALSTATE = {
  forgot: false
}
const forgotReducer = (password=null, action) => {

  return password
}


export const resetPassword = (email) =>{
    console.log(email,' here we are in reset')
    return dispatch =>
    axios.post('/api/forgotPassword', {email})
    .then(() => console.log('something'))
}

export default forgotReducer
