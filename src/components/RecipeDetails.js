import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'


const SERVER_MY_RECIPES = 'http://localhost:3000/recipes.json'
class RecipeDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipe_id: this.props.match.params.id,
      data: []
    }

  }

componentDidMount(){
  this.fetchRecipeDetails();
}

fetchRecipeDetails(){
    axios.get(SERVER_MY_RECIPES, {headers: {
             "Authorization": localStorage.getItem('jwt')
           }
    }).then((response)=>{
        this.setState ({
          data: response.data
        })

      })
  }



  render(){
    return(
      <div>
      <h1>HEllo</h1>
      {this.state.data.map((item)=> {
          if(item.id == this.state.recipe_id){
            return  <div>
            <h2> {item.label}</h2>
            <img src = {item.image} />
            </div>
          }

      })}

      </div>
    )
  }
}

export default RecipeDetails;
