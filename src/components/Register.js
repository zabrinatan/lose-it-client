import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/'
const USER_SERVER_URL = 'http://localhost:3000/users'
class Register extends Component {

  constructor(){
    super();
    this.state = {
      user: "",
      password: "",
      confirm_password: ""
    }
    this._userInput = this._userInput.bind(this);
    this._userPassword = this._userPassword.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);


  }
  _userInput(e){
this.setState ({
  user: e.target.value
})

}

_userPassword(e){
  this.setState ({
    password: e.target.value
  })
}

_handleSubmit(e) {
  e.preventDefault();
  axios.post(USER_SERVER_URL, {
    email: this.state.user,
    password: this.state.password,
    // dataType: 'json'
  })
}


  render(){
    return (
      <form onSubmit = {this._handleSubmit}>
        <h2>Register</h2>
      <input name="user_name"type="text" placeholder="User Name" onChange = {this._userInput}required autoFocus />
      <input type="text" placeholder="Password" onChange= {this._userPassword}required />
      <input type="text" placeholder="confirm password" required />
        <input  name="submit" type="submit" value="Submit" />
      </form>
    )
  }
}

export default Register;
