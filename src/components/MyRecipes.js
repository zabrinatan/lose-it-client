import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mealplan from './Mealplan'
import Header from './Header'

const SERVER_MEALPLAN = "http://localhost:3000/mealplans/addmeal"
const SERVER_MY_RECIPES = "http://localhost:3000/recipes.json"
const SERVER_MY_MEALPLANS = "http://localhost:3000/mealplans.json"
class MyRecipes extends Component {
  constructor(){
    super();
    this.state ={
      favourites: [],
      day: "",
      meal: "",
      recipe: "",
      SundayBreakfast: "",
      MondayBreakfast: "",
      TuesdayBreakfast: "",
      WednesdayBreakfast: "",
      ThursdayBreakfast: ""
    }
    this._onSubmit = this._onSubmit.bind(this)

  }
componentDidMount(){

  this.fetchRecipes();
  this.fetchMealPlans();
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

  fetchMealPlans(){
    axios.get(SERVER_MY_MEALPLANS, {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
         }).then((response)=> {
           console.log(response)
         })
  }

_onSubmit(e){
  e.preventDefault();
  const recipe = document.getElementById(e.target.id);
  const meal =recipe.getElementsByClassName('meal')


}

_onClick(day, meal, e){
  this.setState({
    meal: meal,
    day: day
  })

  if (this.state.recipe) {
    axios.post(SERVER_MEALPLAN, {
      meal: meal,
      day: day,
      recipe: this.state.recipe
    },
    {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
    })
  } else {
    alert('click more times, idiots')
  }

}

_handleClick(label, e){
  this.setState({
    recipe: label
  })
}


  render(){
    return(
      <div>
      <Header />
      <h1>My Saved Recipes </h1>
      {this.state.favourites.map((item, index)=> {
        return <div className="box" id={item.label} onClick = {this._handleClick.bind(this, item.label)}>
        <div className="recipe-image">
      <img src = {item.image}/>
        </div>
        <div classNam e="recipe-label">{item.label}</div>
        </div>
      })}
      <table>
        <thead>
        <tr>
        <th></th>
        <th>Sunday</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>Breakfast</td>
            <td id = "SundayBreakfast" onClick = {this._onClick.bind(this, 'Sunday', 'Breakfast')}></td>
            <td id = "MondayBreakfast" onClick = {this._onClick.bind(this, 'Monday', 'Breakfast')}></td>
            <td id = "TuesdayBreakfast" onClick = {this._onClick.bind(this, 'Tuesday', 'Breakfast')}></td>
            <td id = "WednesdayBreakfast" onClick = {this._onClick.bind(this, 'Wednesday', 'Breakfast')}></td>
            <td id = "ThursdayBreakfast" onClick = {this._onClick.bind(this, 'Thursday', 'Breakfast')}></td>
            <td id = "FridayBreakfast" onClick = {this._onClick.bind(this, 'Friday', 'Breakfast')}></td>
            <td id = "7" onClick = {this._onClick.bind(this, 'Saturday', 'Breakfast')}></td>

          </tr>
          <tr>
          <td>Lunch</td>
          <td id = "SundayLunch" onClick = {this._onClick.bind(this, 'Sunday', 'Lunch')}></td>
          <td id = "MondayLunch" onClick = {this._onClick.bind(this, 'Monday', 'Lunch')}></td>
          <td id = "TuesdayLunch" onClick = {this._onClick.bind(this, 'Tuesday', 'Lunch')}></td>
          <td id = "WednesdayLunch" onClick = {this._onClick.bind(this, 'Wednesday', 'Lunch')}></td>
          <td id = "ThursdayLunch" onClick = {this._onClick.bind(this, 'Thursday', 'Lunch')}></td>
          <td id = "FridayLunch" onClick = {this._onClick.bind(this, 'Friday', 'Lunch')}></td>
          <td id = "SaturdayLunch" onClick = {this._onClick.bind(this, 'Saturday', 'Lunch')}></td>
          </tr>

          <tr>
          <td>Dinner </td>
          <td id = "SundayDinner" onClick = {this._onClick.bind(this, 'Sunday', 'Dinner')}></td>
          <td id = "MondayDinner" onClick = {this._onClick.bind(this, 'Monday', 'Dinner')}></td>
          <td id = "TuesdayDinner" onClick = {this._onClick.bind(this, 'Tuesday', 'Dinner')}></td>
          <td id = "WednesdayDinner" onClick = {this._onClick.bind(this, 'Wednesday', 'Dinner')}></td>
          <td id = "ThursdayDinner" onClick = {this._onClick.bind(this, 'Thursday', 'Dinner')}></td>
          <td id = "FridayDinner" onClick = {this._onClick.bind(this, 'Friday', 'Dinner')}></td>
          <td id = "SaturdayDinner" onClick = {this._onClick.bind(this, 'Saturday', 'Dinner')}></td>
          </tr>
        </tbody>
      </table>


      </div>
    )
  }
}

export default MyRecipes
