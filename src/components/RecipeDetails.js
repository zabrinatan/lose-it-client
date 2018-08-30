import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'


// const SERVER_MY_RECIPES = 'http://localhost:3000/recipes.json'
const SERVER_MY_RECIPES = 'https://lose-weight.herokuapp.com/recipe.json'
class RecipeDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipe_id: this.props.match.params.id,
      data: []
    }

  }

componentDidMount(){
  this.fetchRecipeDetails();
}

fetchRecipeDetails(){
    axios.get(SERVER_MY_RECIPES, {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
    }).then((response)=>{
        this.setState ({
          data: response.data
        })

      })
  }



  render(){
    return(
      <div>
      <Header />
      <h1>HEllo</h1>
      {this.state.data.map((item)=> {

          if(item.id == this.state.recipe_id){
            return  <div>
            <h2> {item.label}</h2>
            <img src = {item.image} />
            <h3>Ingredients</h3>
            <h4>Calories: {parseFloat(item.calories).toFixed(0) + "kJ"}</h4>
            <p>Servings: {parseFloat(item.yield).toFixed(0)} </p>
            <a href ={item.url}>hi</a>
            <ul>
            {item.ingredients.map((ingredient)=> {
              console.log(ingredient)
              return <li>{ingredient.ingredientLabel}</li>
            })}
            </ul>
            </div>
          }

      })}

      </div>
    )
  }
}

export default RecipeDetails;
