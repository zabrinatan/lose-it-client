import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

// const SERVER_USER_URL = "http://localhost:3000/users.json";
const SERVER_USER_URL = "https://lose-weight.herokuapp.com/users.json";

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
              <h3>User Details</h3>
              <p> Email: {item.email}</p>
              <p> First Name: {item.first_name} </p>
              <p> Last_Name: {item.last_name}</p>
              <p> Weight(kg): {item.weight} kg</p>
              <p> Height(m): {item.height} m</p>
              <p> Target weight(kg):{item.target_weight} kg</p>
              <h3>BMI</h3>
                <p>Calculated BMI: {(parseFloat(item.weight) / (parseFloat(item.height) * parseFloat(item.height))).toFixed(2) } </p>
            </div>
            <div id="daily-limits">
            <h3>Daily Limits</h3>
              <p>Daily Calories Limit: {item.calories} cal</p>
              <p>Daily Proteins Limit: {item.proteins} g</p>
              <p>Daily Fats Limit: {item.fats} g</p>
              <p>Daily Carbs Limit: {item.carbs} g</p>

            </div>
            <div id='edit-profile-button'>
            <a href = "/#/user/edit"><button>Edit Profile </button></a>
            </div>


              </div>
          }
        })}
      </div>

    )
  }
}

export default User;
