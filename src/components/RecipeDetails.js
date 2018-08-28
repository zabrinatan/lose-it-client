import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'


const SERVER_MY_RECIPES = 'http://localhost:3000/recipes.json'
class RecipeDetails extends Component {
  constructor(){
    super();
  }

componentDidMount(){
  this.fetchRecipeDetails();
}

fetchRecipeDetails(){
    axios.get(SERVER_MY_RECIPES, {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
    }).then((response)=>{
      console.log(response)

      })
  }



  render(){
    return(
      <div>
      <h1>HEllo</h1>
      </div>
    )
  }
}

export default RecipeDetails;
