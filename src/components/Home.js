import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return(
      <div>
      <LoginForm />
      <Register />
      </div>
    );
  }
};
class LoginForm extends Component {

  render() {
    return(
      <form>
        <h2>Login</h2>
      <input name="user_name"type="text" placeholder="User Name" required autoFocus />
      <input type="text" placeholder="Password" required />
        <input  name="submit" type="submit" value="Submit" />
      </form>
    );
  }
}

class Register extends Component {
  constructor(){
    super();
    this.state = {
      user: "",
      password: "",
      confirm_password: ""
    }
    this._userInput = this._userInput.bind(this);
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
  render(){
    return (
      <form>
        <h2>Register</h2>
      <input name="user_name"type="text" placeholder="User Name" onChange = {this._userInput}required autoFocus />
      <input type="text" placeholder="Password" onChange= {this._userPassword}required />
      <input type="text" placeholder="confirm password" required />
        <input  name="submit" type="submit" value="Submit" />
      </form>
    )
  }
}
export default Home;
