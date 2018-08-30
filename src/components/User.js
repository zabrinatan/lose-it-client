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
      data: [],
      BMI: ''
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
      <Header />
        {this.state.data.map((item)=> {
          if(item.id == this.state.user_id){
            return <div id="user-container">
            <div id="user-details">
              <p> Email: {item.email}</p>
              <p> First Name: {item.first_name} </p>
              <p> Last_Name: {item.last_name}</p>
              <p> Weight(kg): {item.weight}</p>
              <p> Height(m): {item.height}</p>
              <p> Target weight(kg):{item.target_weight} </p>
            </div>
            <div id="daily-limits">
              <p>Daily Calories Limit: {item.calories}</p>
              <p>Daily Proteins Limit: {item.proteins}</p>
              <p>Daily Fats Limit: {item.fats}</p>
              <p>Daily Carbs Limit: {item.carbs}</p>
            </div>
            <div id="bmi-calculated">
              <p>Calculated BMI: {(parseFloat(item.weight) / (parseFloat(item.height) * parseFloat(item.height))).toFixed(2) } </p>
            </div>
              </div>
          }
        })}
        <a href = "/#/user/edit"><button>Edit Profile </button></a>
      </div>

    )
  }
}

export default User;
