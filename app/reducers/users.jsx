import axios from 'axios'
import store from '../store'
const initialState = {users: []}
/*************ACTIONS **********************/
const GET_USERS = 'GET_USERS'
const DEL_USERS = 'DEL_USERS'
const UPDATE = 'UPDATE'
/*************ACTION CREATORS **********************/
const getAllUsers = (users) => ({type: GET_USERS, users})
const removeUser = (id) => ({type: DEL_USERS, id })
const update = (user) => {

console.log("udududu")

return {type:UPDATE, user }
}
/*************REDUCER **********************/
// [...newState.users, action.users]  did not work so returning action.users
const userReducer = (users=initialState, action) => {
  switch (action.type) {
  case GET_USERS:
    return action.users

  case DEL_USERS:
    return users.filter(user => user.id !== action.id)

  case UPDATE:
  console.log(action, "*dsdr252*")
    return users.map(user => (
        action.user.id === user.id ? action.user : user
      ));
   }
  return users
}
/************* DISPATCHER ************** *********/
// dispatch did not work.  only store.dispatch works
export const fetchUsers = () =>
dispatch =>
    axios.get('/api/users')
      .then(response => {
        const users = response.data
        dispatch(getAllUsers(users))
      })
      .catch(err => console.error)
export const deleteUser = (userId) =>
  dispatch =>
    axios.delete(`/api/users/${userId}`)
      .then(() => {
        dispatch(removeUser(userId), status)
      })
      .catch(err => console.error)
export const updateUser = (userId, status) =>
dispatch =>
    axios.put(`/api/users/promote/${userId}`, status)
      .then(user => {
        dispatch(update(user.data))
      })
      .catch(err => console.error)
export default userReducer
