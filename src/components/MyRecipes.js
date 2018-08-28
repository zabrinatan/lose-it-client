import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mealplan from './Mealplan'
import Header from './Header'

const SERVER_MEALPLAN = "http://localhost:3000/mealplans/addmeal"
const SERVER_MY_RECIPES = "http://localhost:3000/recipes.json"
const SERVER_MY_MEALPLANS = "http://localhost:3000/mealplans.json"
const SERVER_DESTROY_MEALPLAN = "http://localhost:3000/mealplans"
class MyRecipes extends Component {
  constructor(){
    super();
    this.state ={
      favourites: [],
      favouritesLabel: [],
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
    this.onRecipeClick = this.onRecipeClick.bind(this)
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
      console.log(response)
      this.setState({
        favourites: response.data,
      })
    }).then(()=> {
      this.state.favourites.map((item)=> {

        this.state.favouritesLabel.push(item.label)
        })
      })
  }

  fetchMealPlans(){
    axios.get(SERVER_MY_MEALPLANS, {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
         }).then((response)=> {
           let data = response.data
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
  const id = e.target.id;
  const targetId = document.getElementById(id);

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
  }

  if(targetId.innerHTML !== ""){
    axios.post(SERVER_DESTROY_MEALPLAN, {
          meal: meal,
          day: day,
          recipe: ""
        }, {headers: {
                     "Authorization": localStorage.getItem('jwt')
                   }
            } )
  }


  window.location.reload()

}

_handleClick(label, e){
  this.setState({
    recipe: label
  })
}

onRecipeClick(e){
  // document.getElementById("result-list").innerHTML = ""

  const targetId =  document.getElementById(e.target.id)
  const targetRecipeId = targetId.innerHTML;
  const targetRecipe = document.getElementById(targetRecipeId);

  const boxClass = document.getElementsByClassName('box')
  //
  // for(let i = 0 ; i< = boxClass.length ; i++){}
  // console.log(boxClass.length)
  //   boxClass.forEach(function(i){
  //     if (i == e.target.id) {
  //   console.log(i);
  //   // console.log(obj)
  // }
    // })
    targetRecipe.style.display = "inline-block";

}


  render(){
    return(
      <div>
      <Header />
      <h1>My Saved Recipes </h1>

      <div id="side-bar">

      {this.state.favourites.map((item, index)=> {
          return <p onClick = {this.onRecipeClick} id= {index}>{item.label}</p>
      })
    }

      </div>
      <div id = "result-list">
      {this.state.favourites.map((item, index)=> {
        return <div className={"box " + index} id={item.label} onClick = {this._handleClick.bind(this, item.label)}>
        <div id= "overlay">Calories: {parseFloat(item.calories).toFixed(2)}Kj
        <button>View Recipe</button>
        </div>

      <img className="recipe-image" src = {item.image}/>

        <div className="recipe-label">{item.label}</div>
        </div>
      })}
      </div>
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
