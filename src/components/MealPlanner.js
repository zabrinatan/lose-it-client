import React, { Component } from 'react';
import axios from 'axios';

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
      mealPlans: []
    }
  }

  componentDidMount() {
    //fetches mealplans from database every 500ms to update the mealplan table
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
          this.setState({
              mealPlans: data.map((item)=> { return {meal: item.meal, day: item.day, recipe: item.recipe}})
            })
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
      //if the user selects the recipe from the modal, send the recipe to the database
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
    // if the td of the table is not empty and it has been clicked, clear the recipe
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
    // finds out if there is an existing recipe in the state
    const mealObject = this.state.mealPlans.find((mealplan)=>{
      return mealplan.meal=== meal && mealplan.day=== day
    })

    if(mealObject !== undefined ) {
      return <td id={day + meal} onClick={this._onClick.bind(this, day, meal)}>{mealObject.recipe}
      </td>
    } else {
      return <td id={day + meal} onClick={this._onClick.bind(this, day, meal)}></td>
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
