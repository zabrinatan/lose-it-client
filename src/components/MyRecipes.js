import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mealplan from './Mealplan'
import Header from './Header'

const SERVER_MEALPLAN = "http://localhost:3000/mealplans/addmeal"
const SERVER_MY_RECIPES = "http://localhost:3000/recipes.json"
class MyRecipes extends Component {
  constructor(){
    super();
    this.state ={
      favourites: [],
      day: "",
      meal: "",
      recipe: ""
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


}

_onClick(day, meal, e){
  console.log(day)
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
            <td id = "1" onClick = {this._onClick.bind(this, 'Sunday', 'Breakfast')}></td>
            <td id = "2" onClick = {this._onClick.bind(this, 'Monday', 'Breakfast')}></td>
            <td id = "3" onClick = {this._onClick.bind(this, 'Tuesday', 'Breakfast')}></td>
            <td id = "4" onClick = {this._onClick.bind(this, 'Wednesday', 'Breakfast')}></td>
            <td id = "5" onClick = {this._onClick.bind(this, 'Thursday', 'Breakfast')}></td>
            <td id = "6" onClick = {this._onClick.bind(this, 'Friday', 'Breakfast')}></td>
            <td id = "7" onClick = {this._onClick.bind(this, 'Saturday', 'Breakfast')}></td>

          </tr>
          <tr>
          <td>Lunch</td>
          <td id = "8" onClick = {this._onClick.bind(this, 'Sunday', 'Lunch')}></td>
          <td id = "9" onClick = {this._onClick.bind(this, 'Monday', 'Lunch')}></td>
          <td id = "10" onClick = {this._onClick.bind(this, 'Tuesday', 'Lunch')}></td>
          <td id = "11" onClick = {this._onClick.bind(this, 'Wednesday', 'Lunch')}></td>
          <td id = "12" onClick = {this._onClick.bind(this, 'Thursday', 'Lunch')}></td>
          <td id = "13" onClick = {this._onClick.bind(this, 'Friday', 'Lunch')}></td>
          <td id = "14" onClick = {this._onClick.bind(this, 'Saturday', 'Lunch')}></td>
          </tr>

          <tr>
          <td>Dinner </td>
          <td id = "15" onClick = {this._onClick.bind(this, 'Sunday', 'Dinner')}></td>
          <td id = "16" onClick = {this._onClick.bind(this, 'Monday', 'Dinner')}></td>
          <td id = "17" onClick = {this._onClick.bind(this, 'Tuesday', 'Dinner')}></td>
          <td id = "18" onClick = {this._onClick.bind(this, 'Wednesday', 'Dinner')}></td>
          <td id = "19" onClick = {this._onClick.bind(this, 'Thursday', 'Dinner')}></td>
          <td id = "20" onClick = {this._onClick.bind(this, 'Friday', 'Dinner')}></td>
          <td id = "21" onClick = {this._onClick.bind(this, 'Saturday', 'Dinner')}></td>
          </tr>
        </tbody>
      </table>


      </div>
    )
  }
}

export default MyRecipes
