import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mealplan from './Mealplan';
import MyRecipes from './MyRecipes';

class RecipePlanning extends Component {
  render(){
    return(
      <div>
      <MyRecipes />
      <Mealplan />
      </div>
    )
  }
}

export default RecipePlanning;
