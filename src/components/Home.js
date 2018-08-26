import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';
import Login from './Login';

class Home extends Component {

  render() {
    return(
      <div>
      <nav>
      <Link to = {`/login`}>Login</Link>
      <Link to = {`/register`}>Register</Link>
      <Link to = {`/my-recipes`}>My Recipes</Link>
      <Link to = {`/search`}>Search</Link>

      </nav>


      </div>
    );
  }
};

export default Home;
