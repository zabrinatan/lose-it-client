import React, { Component } from 'react';
import axios from 'axios';

// const SERVER_DESTROY_MEALPLAN = "http://localhost:3000/mealplans"
// const SERVER_MEALPLAN = "http://localhost:3000/mealplans/addmeal"
// const SERVER_MY_MEALPLANS = "http://localhost:3000/mealplans.json"
const SERVER_DESTROY_MEALPLAN = "https://lose-weight.herokuapp.com/mealplans"
const SERVER_MEALPLAN = "https://lose-weight.herokuapp.com/mealplans/addmeal"
const SERVER_MY_MEALPLANS = "https://lose-weight.herokuapp.com/mealplans.json"


class MealPlanner extends Component {
  constructor() {
    super()

    this.state = {
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
      SaturdayDinner: "",
    }
  }

  componentDidMount() {
    const mealPoll = () => {
      this.fetchMealPlans()
      setTimeout(mealPoll, 500);
    }
    mealPoll();
  }

  fetchMealPlans() {
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


  _onClick(day, meal, e){
    const id = e.target.id;
    const targetId = document.getElementById(id);

    this.setState({
      meal: meal,
      day: day
    })

    if (this.props.recipe) {
      axios.post(SERVER_MEALPLAN, {
        meal: meal,
        day: day,
        recipe: this.props.recipe
      },
      {headers: {
               "Authorization": localStorage.getItem('jwt')
             }
      })
    }

    if (targetId.innerHTML !== "") {
      axios.post(SERVER_DESTROY_MEALPLAN, {
            meal: meal,
            day: day,
            recipe: ""
          }, {headers: {
                       "Authorization": localStorage.getItem('jwt')
                     }
              } )
    }


  }

  render() {
    return (
      <table id="mealplan-table">
        <thead>
        <tr>
        <th></th>
        <th><h3>Sunday</h3></th>
        <th><h3>Monday</h3></th>
        <th><h3>Tuesday</h3></th>
        <th><h3>Wednesday</h3></th>
        <th><h3>Thursday</h3></th>
        <th><h3>Friday</h3></th>
        <th><h3>Saturday</h3></th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td><h3>Breakfast</h3></td>
            <td id="SundayBreakfast" onClick={this._onClick.bind(this, 'Sunday', 'Breakfast')}>{this.state.SundayBreakfast}</td>
            <td id="MondayBreakfast" onClick={this._onClick.bind(this, 'Monday', 'Breakfast')}>{this.state.MondayBreakfast}</td>
            <td id="TuesdayBreakfast" onClick={this._onClick.bind(this, 'Tuesday', 'Breakfast')}>{this.state.TuesdayBreakfast}</td>
            <td id="WednesdayBreakfast" onClick={this._onClick.bind(this, 'Wednesday', 'Breakfast')}>{this.state.WednesdayBreakfast}</td>
            <td id="ThursdayBreakfast" onClick={this._onClick.bind(this, 'Thursday', 'Breakfast')}>{this.state.ThursdayBreakfast}</td>
            <td id="FridayBreakfast" onClick={this._onClick.bind(this, 'Friday', 'Breakfast')}>{this.state.FridayBreakfast}</td>
            <td id="7" onClick={this._onClick.bind(this, 'Saturday', 'Breakfast')}>{this.state.SaturdayBreakfast}</td>

          </tr>
          <tr>
          <td><h3>Lunch</h3></td>
          <td id="SundayLunch" onClick={this._onClick.bind(this, 'Sunday', 'Lunch')}>{this.state.SundayLunch}</td>
          <td id="MondayLunch" onClick={this._onClick.bind(this, 'Monday', 'Lunch')}>{this.state.MondayLunch}</td>
          <td id="TuesdayLunch" onClick={this._onClick.bind(this, 'Tuesday', 'Lunch')}>{this.state.TuesdayLunch}</td>
          <td id="WednesdayLunch" onClick={this._onClick.bind(this, 'Wednesday', 'Lunch')}>{this.state.WednesdayLunch}</td>
          <td id="ThursdayLunch" onClick={this._onClick.bind(this, 'Thursday', 'Lunch')}>{this.state.ThursdayLunch}</td>
          <td id="FridayLunch" onClick={this._onClick.bind(this, 'Friday', 'Lunch')}>{this.state.FridayLunch}</td>
          <td id="SaturdayLunch" onClick={this._onClick.bind(this, 'Saturday', 'Lunch')}>{this.state.SaturdayLunch}</td>
          </tr>

          <tr>
          <td><h3>Dinner</h3></td>
          <td id="SundayDinner" onClick={this._onClick.bind(this, 'Sunday', 'Dinner')}>{this.state.SundayDinner}</td>
          <td id="MondayDinner" onClick={this._onClick.bind(this, 'Monday', 'Dinner')}>{this.state.MondayDinner}</td>
          <td id="TuesdayDinner" onClick={this._onClick.bind(this, 'Tuesday', 'Dinner')}>{this.state.TuesdayDinner}</td>
          <td id="WednesdayDinner" onClick={this._onClick.bind(this, 'Wednesday', 'Dinner')}>{this.state.WednesdayDinner}</td>
          <td id="ThursdayDinner" onClick={this._onClick.bind(this, 'Thursday', 'Dinner')}>{this.state.ThursdayDinner}</td>
          <td id="FridayDinner" onClick={this._onClick.bind(this, 'Friday', 'Dinner')}>{this.state.FridayDinner}</td>
          <td id="SaturdayDinner" onClick={this._onClick.bind(this, 'Saturday', 'Dinner')}>{this.state.SaturdayDinner}</td>
          </tr>
        </tbody>
      </table>



    );
  }
};

export default MealPlanner;
