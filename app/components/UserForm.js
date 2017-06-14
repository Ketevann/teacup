import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteUser, updateUser} from '../reducers/users'
import _ from 'lodash'


class Userform extends Component {
  constructor(props) {
    super(props)
    this.ClickHandler = this.ClickHandler.bind(this)
    this.SubmitHandler = this.SubmitHandler.bind(this)
  }
  render(){
    if (!this.props) return <div />
    return (
      <div className="container">
        <div className="row">

          <div className="col-md-7 ">
            <div className="panel panel-default">
              <div className="panel-heading">  <h4>User Profile</h4></div>
              <div className="panel-body">
                <div className="box box-info">
                  <div className="box-body">
                    <div className="col-sm-6">
                      <div > <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" className="img-circle img-responsive" />
                        <input id="profile-image-upload" className="hidden" type="file" />
                        <div style={{color: '#999'}}>click here to change profile image</div>
                        {/*Upload Image Js And Css*/}
                      </div>
                      <br />
                      {/* /input-group */}
                    </div>
                    <div className="col-sm-6">
                      <h4 style={{color: '#00b1b1'}}>{this.props.name} </h4>
                      <span><p>{this.props.role}</p></span>
                    </div>
                    <div className="clearfix" />
                    <hr style={{margin: '5px 0 5px 0'}} />
                    <div className="col-sm-5 col-xs-6 tital ">First Name</div><div className="col-sm-7 col-xs-6 ">{this.props.name}</div>
                    <div className="clearfix" />
                    <div className="bot-border" />
                    <div className="clearfix" />
                    <div className="bot-border" />
                    <div className="col-sm-5 col-xs-6 tital ">Last Name:</div><div className="col-sm-7"> N/A</div>
                    <div className="clearfix" />
                    <div className="bot-border" />
                    <div className="col-sm-5 col-xs-6 tital ">Orders</div><div className="col-sm-7">{this.props.orders.length} </div>
                    <div className="clearfix" />
                    <div className="bot-border" />
                    <div className="col-sm-5 col-xs-6 tital ">Payment</div><div className="col-sm-7">{this.props.payment ? this.props.payment.Name : null} N/A</div>
                    <div className="clearfix" />
                    <div className="bot-border" />
                    <div className="col-sm-5 col-xs-6 tital ">Reviwes</div><div className="col-sm-7">N/A Link</div>

                    <div className="clearfix" />
                    <div className="bot-border" />
                    <div className="col-sm-5 col-xs-6 tital ">
                    {this.props.auth.role === 'admin' ?
                    <div>
                    <button onClick={()=>this.ClickHandler
                      (this.props.id)} type="button" className="btn">Delete</button>

                    <div className="clearfix" />
                    <div className="bot-border" />
                    <br/>
                    <form onSubmit={(event) => this.SubmitHandler(event, this.props.id)}>
              <select name="role">
              <option >admin</option>
              <option>user</option>
              </select>
              <button  type="submit" className="btn">Submit</button>
              </form>  </div>: null} </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  ClickHandler(userId) {
    console.log
    this.props.deleteUser(userId)
  }
  SubmitHandler(evt, userId) {
    evt.preventDefault()

    let status = {role: evt.target.role.value}
    this.props.updateUser(userId, status)
  }
}
const mapState = ({ users, auth }, ownProps) => {

  return {
    auth

  }
}
const mapDispatch = { deleteUser, updateUser }
export default connect(mapState, mapDispatch)(Userform)
