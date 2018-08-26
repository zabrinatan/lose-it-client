import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const SERVER_URL = 'http://localhost:3000/'
const USER_SERVER_URL = 'http://localhost:3000/users'
const LOGIN_SERVER_URL = 'http://localhost:3000/login'
class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: ''
    }

    this._handleEmail = this._handleEmail.bind(this);
    this._handlePassword = this._handlePassword.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

_handleEmail(e){
  this.setState({
    email: e.target.value
  })
}
_handlePassword(e){
  this.setState({
    password: e.target.value
  })
}

_handleSubmit(e){
  e.preventDefault();
  axios.post(LOGIN_SERVER_URL, {
    email: this.state.email,
    password: this.state.password

  })
}

  render() {
    return(
      <form onSubmit = {this._handleSubmit}>
        <h2>Login</h2>
      <input name="user_name"type="text" placeholder="email address" required autoFocus onChange = {this._handleEmail}/>
      <input type="text" placeholder="Password" required onChange = {this._handlePassword}/>
        <input  name="submit" type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
