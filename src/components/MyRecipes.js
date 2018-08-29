import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'
import MealPlanner from './MealPlanner'
import RecipeModal from './RecipeModal'

const SERVER_MEALPLAN = "http://localhost:3000/mealplans/addmeal"
const SERVER_MY_RECIPES = "http://localhost:3000/recipes.json"
const SERVER_MY_MEALPLANS = "http://localhost:3000/mealplans.json"
const SERVER_DESTROY_MEALPLAN = "http://localhost:3000/mealplans"
// const SERVER_MEALPLAN = "https://lose-weight.herokuapp.com/mealplans/addmeal"
// const SERVER_MY_RECIPES = "https://lose-weight.herokuapp.com/recipes.json"
// const SERVER_MY_MEALPLANS = "https://lose-weight.herokuapp.com/mealplans.json"
// const SERVER_DESTROY_MEALPLAN = "https://lose-weight.herokuapp.com/mealplans"
class MyRecipes extends Component {
  constructor() {
    super();
    this.state ={
      favourites: [],
      favouritesLabel: [],
      recipe_id: [],
      currentRecipe: undefined,
      modalIsOpen: false,
      recipe: null,
    }
    this._onSubmit = this._onSubmit.bind(this)
    this.onRecipeClick = this.onRecipeClick.bind(this)
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes() {
    axios.get(SERVER_MY_RECIPES, {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
    }).then((response)=>{
      console.log(response.data)
      this.setState({
        favourites: response.data,
      })
    })
  }



_onSubmit(e){
  e.preventDefault();
  const recipe = document.getElementById(e.target.id);
  const meal =recipe.getElementsByClassName('meal')


}

_handleClick = (label, e ) => {
  this.setState({
    recipe: label,
    modalIsOpen: false
  })
}

onRecipeClick(e){
  console.log(e.target.id)
  // document.getElementById("result-list").innerHTML = ""
  this.setState({
    currentRecipe: e.target.id,
     modalIsOpen: true

  })


}

  _renderSideBar = (favourites) => {
    return favourites.map((item, index) => {
      return <p onClick={this.onRecipeClick} key={index} id={index}>{item.label}</p>
    })
  }

  render() {
    const { favourites, currentRecipe } = this.state
    return (
      <div id="myRecipesPage">
        <Header />

        <div className="container">
          <div id="side-bar">
            {this._renderSideBar(favourites)}
          </div>

          <MealPlanner
            recipe={this.state.recipe}
          />
        </div>
        <RecipeModal
          handleClick={this._handleClick}
          favourites={this.state.favourites}
          modalIsOpen={this.state.modalIsOpen}
          currentRecipe={this.state.currentRecipe}
        />

        <div id='mealplan-intro'>
        <h4>Quick Instructions</h4>
        <ol>
          <li>1.   Select a recipe from the list </li>
          <li>2.   Click the square of the desired day and meal for the recipe</li>
          <li>3.   Click the square again if you want to remove that recipe </li>
          </ol>
        </div>
      </div>
    )
  }
}

export default MyRecipes
