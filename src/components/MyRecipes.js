import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mealplan from './Mealplan'

const SERVER_MY_RECIPES = "http://localhost:3000/recipes.json"
class MyRecipes extends Component {
  constructor(){
    super();
    this.state ={
      favourites: []
    }

  }
componentDidMount(){

  this.fetchRecipes();
}
  fetchRecipes(){
    axios.get(SERVER_MY_RECIPES).then((response)=>{
      this.setState({
        favourites: response.data
      })
    })
  }
  render(){
    console.log(this.state.favourites)
    return(
      <div>
      <h1>My Saved Recipes </h1>
      {this.state.favourites.map((item)=> {
        return <div className="box">
        <div className="recipe-image">
        <a href= {item.url} target= "_blank"><img src = {item.image}/></a>
        </div>
        <div className="recipe-label">{item.label}</div>
        </div>
      })}

      <Mealplan />
      </div>
    )
  }
}

export default MyRecipes
