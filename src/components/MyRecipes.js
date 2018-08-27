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
      responseData: [],
      SundayBreakfast: "",
      MondayBreakfast: "",
      TuesdayBreakfast: "",
      WednesdayBreakfast: "",
      ThursdayBreakfast: "",
      FridayBreakfast: "",
      SaturdayBreakfast: "",
      SundayLunch: "",
      MondayLunch: "",
      TuesdayLunch: "",
      WednesdayLunch: "",
      ThursdayLunch: "",
      FridayLunch: "",
      SaturdayLunch: "",
      SundayDinner: "",
      MondayDinner: "",
      TuesdayDinner: "",
      WednesdayDinner: "",
      ThursdayDinner: "",
      FridayDinner: "",
      SaturdayDinner: ""
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

           let data = response.data
           console.log(data)
           data.map((item)=> {
             if(item.meal === "Breakfast"){
               if(item.day === "Sunday"){
                 this.setState ({
                   SundayBreakfast: item.recipe
                 })
               }else if(item.day === "Monday"){
                 this.setState ({
                   MondayBreakfast: item.recipe
                 })
               }else if (item.day === "Tuesday"){
                 this.setState ({
                   TuesdayBreakfast: item.recipe
                 })
               }else if (item.day === "Wednesday") {
                 this.setState ({
                   WednesdayBreakfast: item.recipe
                 })
               }else if (item.day === "Thursday"){
                 this.setState ({
                   ThursdayBreakfast: item.recipe
                 })
               }else if (item.day === "Friday"){
                 this.setState ({
                   FridayBreakfast: item.recipe
                 })
               }else if (item.day === "Saturday"){
                 this.setState ({
                   SaturdayBreakfast: item.recipe
                 })
               }
             }else if (item.meal === "Lunch"){
               if(item.day === "Sunday"){
                 this.setState ({
                   SundayLunch: item.recipe
                 })
               }else if(item.day === "Monday"){
                 this.setState ({
                   MondayLunch: item.recipe
                 })
               }else if (item.day === "Tuesday"){
                 this.setState ({
                   TuesdayLunch: item.recipe
                 })
               }else if (item.day === "Wednesday") {
                 this.setState ({
                   WednesdayLunch: item.recipe
                 })
               }else if (item.day === "Thursday"){
                 this.setState ({
                   ThursdayLunch: item.recipe
                 })
               }else if (item.day === "Friday"){
                 this.setState ({
                   FridayLunch: item.recipe
                 })
               }else if (item.day === "Saturday"){
                 this.setState ({
                   SaturdayLunch: item.recipe
                 })
               }

             }else if (item.meal === "Dinner") {
               if(item.day === "Sunday"){
                 this.setState ({
                   SundayDinner: item.recipe
                 })
               }else if(item.day === "Monday"){
                 this.setState ({
                   MondayDinner: item.recipe
                 })
               }else if (item.day === "Tuesday"){
                 this.setState ({
                   TuesdayDinner: item.recipe
                 })
               }else if (item.day === "Wednesday") {
                 this.setState ({
                   WednesdayDinner: item.recipe
                 })
               }else if (item.day === "Thursday"){
                 this.setState ({
                   ThursdayDinner: item.recipe
                 })
               }else if (item.day === "Friday"){
                 this.setState ({
                   FridayDinner: item.recipe
                 })
               }else if (item.day === "Saturday"){
                 this.setState ({
                   SaturdayDinner: item.recipe
                 })
               }
             }
             }
           )

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

  window.location.reload();

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
            <td id = "SundayBreakfast" onClick = {this._onClick.bind(this, 'Sunday', 'Breakfast')}>{this.state.SundayBreakfast}</td>
            <td id = "MondayBreakfast" onClick = {this._onClick.bind(this, 'Monday', 'Breakfast')}>{this.state.MondayBreakfast}</td>
            <td id = "TuesdayBreakfast" onClick = {this._onClick.bind(this, 'Tuesday', 'Breakfast')}>{this.state.TuesdayBreakfast}</td>
            <td id = "WednesdayBreakfast" onClick = {this._onClick.bind(this, 'Wednesday', 'Breakfast')}>{this.state.WednesdayBreakfast}</td>
            <td id = "ThursdayBreakfast" onClick = {this._onClick.bind(this, 'Thursday', 'Breakfast')}>{this.state.ThursdayBreakfast}</td>
            <td id = "FridayBreakfast" onClick = {this._onClick.bind(this, 'Friday', 'Breakfast')}>{this.state.FridayBreakfast}</td>
            <td id = "7" onClick = {this._onClick.bind(this, 'Saturday', 'Breakfast')}>{this.state.SaturdayBreakfast}</td>

          </tr>
          <tr>
          <td>Lunch</td>
          <td id = "SundayLunch" onClick = {this._onClick.bind(this, 'Sunday', 'Lunch')}>{this.state.SundayLunch}</td>
          <td id = "MondayLunch" onClick = {this._onClick.bind(this, 'Monday', 'Lunch')}>{this.state.MondayLunch}</td>
          <td id = "TuesdayLunch" onClick = {this._onClick.bind(this, 'Tuesday', 'Lunch')}>{this.state.TuesdayLunch}</td>
          <td id = "WednesdayLunch" onClick = {this._onClick.bind(this, 'Wednesday', 'Lunch')}>{this.state.WednesdayLunch}</td>
          <td id = "ThursdayLunch" onClick = {this._onClick.bind(this, 'Thursday', 'Lunch')}>{this.state.ThursdayLunch}</td>
          <td id = "FridayLunch" onClick = {this._onClick.bind(this, 'Friday', 'Lunch')}>{this.state.FridayLunch}</td>
          <td id = "SaturdayLunch" onClick = {this._onClick.bind(this, 'Saturday', 'Lunch')}>{this.state.SaturdayLunch}</td>
          </tr>

          <tr>
          <td>Dinner </td>
          <td id = "SundayDinner" onClick = {this._onClick.bind(this, 'Sunday', 'Dinner')}>{this.state.SundayDinner}</td>
          <td id = "MondayDinner" onClick = {this._onClick.bind(this, 'Monday', 'Dinner')}>{this.state.MondayDinner}</td>
          <td id = "TuesdayDinner" onClick = {this._onClick.bind(this, 'Tuesday', 'Dinner')}>{this.state.TuesdayDinner}</td>
          <td id = "WednesdayDinner" onClick = {this._onClick.bind(this, 'Wednesday', 'Dinner')}>{this.state.WednesdayDinner}</td>
          <td id = "ThursdayDinner" onClick = {this._onClick.bind(this, 'Thursday', 'Dinner')}>{this.state.ThursdayDinner}</td>
          <td id = "FridayDinner" onClick = {this._onClick.bind(this, 'Friday', 'Dinner')}>{this.state.FridayDinner}</td>
          <td id = "SaturdayDinner" onClick = {this._onClick.bind(this, 'Saturday', 'Dinner')}>{this.state.SaturdayDinner}</td>
          </tr>
        </tbody>
      </table>


      </div>
    )
  }
}

export default MyRecipes
