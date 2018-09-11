import React, { Component } from 'react';
import axios from 'axios';

// const SERVER_DESTROY_MEALPLAN = "http://localhost:3000/mealplans"
// const SERVER_MEALPLAN = "http://localhost:3000/mealplans/addmeal"
// const SERVER_MY_MEALPLANS = "http://localhost:3000/mealplans.json"
const SERVER_DESTROY_MEALPLAN = "https://lose-weight.herokuapp.com/mealplans"
const SERVER_MEALPLAN = "https://lose-weight.herokuapp.com/mealplans/addmeal"
const SERVER_MY_MEALPLANS = "https://lose-weight.herokuapp.com/mealplans.json"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const meals = ["Breakfast", "Lunch", "Dinner"]

class MealPlanner extends Component {
  constructor() {
    super()

    this.state = {
      day: "",
      meal: "",
      recipe: "",
      responseData: [],
      mealPlans: [
        {meal: "Breakfast", day: "Sunday", recipe: "Chicken Risotto"},
        {meal: "Lunch", day: "Tuesday", recipe: "Orange Chicken"}
      ]
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

  checkRecipe(day, meal){
    const mealObject = this.state.mealPlans.find((mealplan)=>{
      return mealplan.meal=== meal && mealplan.day=== day
    })

    if(mealObject !== undefined ) {
      return <td onClick={this._onClick.bind(this, day ,meal)}>{mealObject.recipe}
      </td>
    } else {
      return <td/>
    }

  }

  _renderTable = () => {
    return meals.map((meal)=>{
      return <tr>
        <td>{meal}</td>
          {days.map((day)=> {
            return this.checkRecipe(day, meal)
          })}
      </tr>
    })
    }


  render() {

    return (
      <table id="mealplan-table">
        <thead>
        <tr>
        <th></th>

        {days.map((day)=> {
          return <th><h3>{day}</h3></th>
        })}

        </tr>
        </thead>
        <tbody>
            {this._renderTable()}


        </tbody>
      </table>



    );
  }
};

export default MealPlanner;
