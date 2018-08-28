import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const SERVER_USER_URL = "http://localhost:3000/users.json";
class User extends Component {


  constructor(props){
    super(props);
    this.state = {
      user_id: "",
      data: []
    }
  }
  componentDidMount(){
    this.fetchUser();
  }

  fetchUser(){
    axios.get(SERVER_USER_URL, {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
           }).then((response)=> {
            this.setState({
              user_id: localStorage.getItem('user_id'),
              data: response.data.users
            })

           })
  }
  render(){
    return(
      <div>
      <h1>Hiiiiii</h1>
        {this.state.data.map((item)=> {
          if(item.id == this.state.user_id){
            return <p> {item.email}</p>
          }
        })}
      </div>

    )
  }
}

export default User;
