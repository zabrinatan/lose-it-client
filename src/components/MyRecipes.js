import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mealplan from './Mealplan'
import Header from './Header'


const SERVER_MY_RECIPES = "http://localhost:3000/recipes.json"
class MyRecipes extends Component {
  constructor(){
    super();
    this.state ={
      favourites: [],
      day: "",
      meal: ""
    }
    this._onSubmit = this._onSubmit.bind(this)

  }
componentDidMount(){

  this.fetchRecipes();
}
  fetchRecipes(){
    axios.get(SERVER_MY_RECIPES, {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
    }).then((response)=>{
      this.setState({
        favourites: response.data
      })
    })
  }

_onSubmit(e){
  e.preventDefault();
  const recipe = document.getElementById(e.target.id);
  const meal =recipe.getElementsByClassName('meal')

  // const dayValue = day.value;

  // this.setState({
  //   meal: dayValue
  // })
}


  render(){
    console.log(this.state.favourites)
    return(
      <div>
      <h1>My Saved Recipes </h1>
      {this.state.favourites.map((item, index)=> {
        return <div className="box" id={item.label}>
        <div className="recipe-image">
      <img src = {item.image}/>
        </div>
        <div classNam e="recipe-label">{item.label}</div>
        <form id = {index} onSubmit = {this._onSubmit}>
        <select name="meal"className = "meal">
        <option value ="Breakfast">Breakfast</option>
        <option value ="Lunch">Lunch</option>
        <option value ="Dinner">Dinner</option>
        </select>
        <select name="day" className= "day">
        <option>Sunday</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>

        </select>
        <button >Select</button>
        </form>
        </div>

      })}

      </div>
    )
  }
}

export default MyRecipes
