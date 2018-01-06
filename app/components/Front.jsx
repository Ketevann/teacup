import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";




const Front = () => {
  return (<div className="homepage">
    <form action="https://formspree.io/katie.tsin@gmail.com"
      method="POST">
    <input type="text" name="name" />
        <input type="email" name="_replyto" />
    <input type="submit" value="Send" />
</form>
  </div>)
}


export default Front

