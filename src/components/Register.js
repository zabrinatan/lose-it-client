import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash'

const SERVER_URL = 'http://localhost:3000/'
const USER_SERVER_URL = 'http://localhost:3000/users'
class Register extends Component {

  constructor(){
    super();
    this.state = {
      form_disabled: false,
            message: "Email :",
            users: {},
            user: {
              email: '',
              password: '',
              password_confirmation: ''
            }
    }
    this._handleEmailInput = this._handleEmailInput.bind(this)
       this._handlePasswordInput = this._handlePasswordInput.bind(this)
       this._handlePasswordConfirm = this._handlePasswordConfirm.bind(this)
       this._handleSubmit = this._handleSubmit.bind(this)


  const fetchUsers = () => {
  axios.get(SERVER_URL + 'users.json').then(result => {
    console.log(result);
    this.setState({ users: result.data.users })
  })
}

fetchUsers();
}

_handlePasswordInput(e) {
  this.setState({
    user: { ...this.state.user, password: e.target.value }
  })
}

_handlePasswordConfirm(e) {
  this.setState({
    user: { ...this.state.user, password_confirmation: e.target.value }
  })
}


_handleSubmit(e) {
  e.preventDefault();
  axios.post(USER_SERVER_URL, {user: this.state.user}).then((result) => {
    console.log("Response came back:", result);

  }).then(() => {
    this.props.history.push('/login')}
  ).catch((errors) => {
    console.log("Errors came back:", errors);
  })

}

  _handleEmailInput(e) {
     if (_.filter(this.state.users, { email: e.target.value }).length === 0) {
       this.setState({
         user: { ...this.state.user, email: e.target.value },
         message: "Email :",
         form_disabled: false
       })
     } else {
       this.setState({
         message: "Email already registered",
         form_disabled: true
       })
     }
   }


  render(){
    return (
      <form onSubmit = {this._handleSubmit}>
        <h2>Register</h2>
        {this.state.message}
      <input name="user_name"type="email" placeholder="Email" onChange = {this._handleEmailInput} value = {this.state.user.email} required autoFocus />
      <input type="password" placeholder="Password" onChange={this._handlePasswordInput} value={this.state.user.password} required />
      <input type="password" placeholder="confirm password" required  onChange={this._handlePasswordConfirm} value={this.state.user.password_confirmation} required/>
      <button type="submit" name="signup" disabled={this.state.form_disabled}>Sign Up</button>
      </form>
    )
  }
}

export default Register;
