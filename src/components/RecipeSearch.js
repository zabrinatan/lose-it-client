import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'

// const SERVER_RECIPE_SAVE ="https://lose-weight.herokuapp.com/recipes"
const SERVER_RECIPE_SAVE = "http://localhost:3000/recipes"
const SERVER_INGREDIENT_SAVE = "http://localhost:3000/addingredients"
// const SERVER_RECIPE_CALL ='https://lose-weight.herokuapp.com/recipes/apicall';

const SERVER_RECIPE_CALL ='http://localhost:3000/recipes/apicall';
class RecipeSearch extends Component {
  constructor(){
    super();
    this.state = {
      q: "",
      response: [],

    }
    this._handleButton = this._handleButton.bind(this);
    this._handleQuery = this._handleQuery.bind(this);
    this._handleClick = this._handleClick.bind(this);


  }

_handleButton(e) {
  e.preventDefault();
  axios.post(SERVER_RECIPE_CALL, {
    q: this.state.q
  }).then((response)=> {
    this.setState({
      response: response.data.hits
    })
  })
}

_handleQuery(e){
  this.setState({
    q: e.target.value
  })
}

_handleClick(e){
    e.preventDefault();
  const currentTargetId = e.target.id
const currentButton = document.getElementById(currentTargetId)
currentButton.innerHTML = "Added to My Recipes"
console.log(this.state.response[currentTargetId])
axios.post(SERVER_RECIPE_SAVE,{
  data: this.state.response[currentTargetId],

},
{headers: {
         "Authorization": localStorage.getItem('jwt')
       }
}
)

}


  render(){
    return(
      <div>
      <Header />

      <div id="search-table">
      <form id="search-bar">
      <input type="text" placeholder="Search" required onChange = {this._handleQuery} id="search-input"/>
      <button onClick = {this._handleButton} id="search-button">Search </button>
      </form>
      </div>
      <div id="search-container">
      {this.state.response.map((item, index)=> {
        return <div className="box-search">
        <button className="button-overlay"id = {index} onClick={this._handleClick}>Add to Favorites</button>
        <img className="recipe-image"src = {item.recipe.image} onClick = {this._handleClickImage}/><p className="recipe-label">{item.recipe.label}</p>
        </div>
      })}


      </div>
      </div>
    )
  }
}

export default RecipeSearch;
