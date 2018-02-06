import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { forgotPassword, forgotPasswordBoolFalse } from '../reducers/forgot'
import store from '../store'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ForgotPassword extends React.Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    const { forgot } = this.props
    return (
      <div>
        <div id="loginform" className="container">
          <div className="wrapper">
            <form action method="post" name="Login_Form" className="form-signin" onSubmit={evt => {
              evt.preventDefault()
              this.props.forgotPassword(evt.target.username.value)
              store.dispatch(forgotPasswordBoolFalse())
              this.openModal()
            }}>
              <h3 className="form-signin-heading">Please Enter Your Email</h3>
              <hr className="colorgraph" /> <br />
              <input type="text" className="form-control" name="username" placeholder="Username" required autofocus />
              <button className="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Login</button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                <div id="emailnotify">The Password Reset Link Has Been Sent To Your Email!</div>
                <button className="btn" onClick={this.closeModal}>close</button>
              </Modal>
            </form>
          </div>
        </div>
      </div>

    )
  }
}


export default connect(
  ({ forgot }) => ({ forgot }),
  { forgotPassword, forgotPasswordBoolFalse },
)(ForgotPassword)
