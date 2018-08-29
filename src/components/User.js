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
              console.log(response.data.users)
           })
  }
  render(){
    return(
      <div>
      <Header />
      <h1>Hiiiiii</h1>
        {this.state.data.map((item)=> {
          if(item.id == this.state.user_id){
            return <div> <p> Email: {item.email}</p>
              <p> First Name: {item.first_name} </p>
              <p> Last_Name: {item.last_name}</p>
              <p> Weight(kg): {item.weight}</p>
              <p> Height(m): {item.height}</p>
              <p> Target weight(kg):{item.target_weight} </p></div>
          }
        })}
        <a href = "/#/user/edit"><button>Edit Profile </button></a>
      </div>

    )
  }
}

export default User;
