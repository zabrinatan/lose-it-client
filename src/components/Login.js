import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash'
import Header from './Header'

const LOGIN_SERVER_URL = 'https://lose-weight.herokuapp.com/user_token'
const USER_JSON_URL = 'https://lose-weight.herokuapp.com/users.json'
class Login extends Component {
  constructor(){
    super();
    this.state = {
      auth: {
        email: "",
        password: ''
      }
    }
    this._handleEmail = this._handleEmail.bind(this);
    this._handlePassword = this._handlePassword.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

_handleEmail(e){
  this.setState({
    auth: {... this.state.auth, email: e.target.value}
  })
}
_handlePassword(e){
  this.setState({
    auth: {...this.state.auth, password: e.target.value}
  })
}

_handleSubmit(e){
  e.preventDefault();
  axios.post(LOGIN_SERVER_URL, this.state).then((result)=>{
    console.log(result)
    localStorage.setItem("jwt", result.data.jwt);
localStorage.setItem("username", this.state.auth.email);
}).then(()=> {
  axios.get(USER_JSON_URL).then( result => {
      localStorage.setItem("user_id", _.filter(result.data.users, {email: localStorage.getItem("username")})[0].id )
    })
}).then(()=> {
  this.props.history.push('/')}
  ).catch( (errors) => {
  console.log(errors)
})

}

  render() {
    return(
      <div>
        <Header />
        <div id="login-form">
          <form onSubmit = {this._handleSubmit}>
          <h2>Login</h2>
          <input name="user_name"type="text" placeholder="email address" required autoFocus onChange = {this._handleEmail}/>
          <input type="text" placeholder="Password" required onChange = {this._handlePassword}/>
          <input  name="submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
