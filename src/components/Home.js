import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';
import Login from './Login';



class Home extends Component {
  render() {
    return(
      <div>
      <Login />
      <Register />
      </div>
    );
  }
};


export default Home;
