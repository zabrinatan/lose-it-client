import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import MealPlanner from './MealPlanner'
import RecipeModal from './RecipeModal'
//
// const SERVER_MEALPLAN = "http://localhost:3000/mealplans/addmeal"
// const SERVER_MY_RECIPES = "http://localhost:3000/recipes.json"
// const SERVER_MY_MEALPLANS = "http://localhost:3000/mealplans.json"
// const SERVER_DESTROY_MEALPLAN = "http://localhost:3000/mealplans"
const SERVER_MEALPLAN = "https://lose-weight.herokuapp.com/mealplans/addmeal"
const SERVER_MY_RECIPES = "https://lose-weight.herokuapp.com/recipes.json"
const SERVER_MY_MEALPLANS = "https://lose-weight.herokuapp.com/mealplans.json"
const SERVER_DESTROY_MEALPLAN = "https://lose-weight.herokuapp.com/mealplans"
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
        <div id='mealplan-intro'>
        <ul>
          <li>Select a recipe from the list </li>
          <li>Click the square of the desired day and meal for the recipe</li>
          <li>Click the square again if you want to remove that recipe </li>
          </ul>
        </div>

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
        <div>

        </div>
      </div>
    )
  }
}

export default MyRecipes
