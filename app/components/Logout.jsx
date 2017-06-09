import React, { Component } from 'react'
import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
// Version 1
export const Logout = ({ logout }) => (
  <div>
    <button className="logout" onClick={logout}>Logout</button>
  </div>
)

export default connect(
  state => ({}),
  {logout},
)(Logout)

// Do I want to use this Version 2 instead?

// class Logout extends Component {
//   constructor() {
//     super()
//     this.onLogout = this.onLogout.bind(this)
//   }
//
//   onLogout(event) {
//     event.preventDefault()
//     this.props.logout()
//   }
//
//   render() {
//     return (
//       <div>
//         <button className="logout" onClick={logout}>Logout</button>
//       </div>
//     )
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     logout: () => dispatch(logout())
//   }
// }
//
// export default connect(mapDispatchToProps)(Logout)
