import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_RECIPE_SAVE = "http://localhost:3000/recipes"
const SERVER_RECIPE_CALL ='http://localhost:3000/recipes/apicall';
class RecipeSearch extends Component {
  constructor(){
    super();
    this.state = {
      q: "",
      response: []
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleQuery = this._handleQuery.bind(this);
    this._handleClick = this._handleClick.bind(this);


  }

_handleSubmit(e) {
  e.preventDefault();
  axios.post(SERVER_RECIPE_CALL, {
    q: this.state.q
  }).then((response)=> {
    this.setState({
      response: response.data.hits
    })
  })
}

_handleQuery(e){
  this.setState({
    q: e.target.value
  })
}

_handleClick(e){
  const currentTargetId = e.target.id
  console.log(currentTargetId)
  e.preventDefault();
axios.post(SERVER_RECIPE_SAVE,{
  data: this.state.response[currentTargetId]
})

}
  render(){
    return(
      <div onSubmit = {this._handleSubmit}>
      <form>
      <input type="Search" placeholder="Search" required onChange = {this._handleQuery}/>

      </form>

      {this.state.response.map((item, index)=> {
        return <div className="box"><div className="recipe-image"><img src = {item.recipe.image}/></div> <div className="recipe-label">{item.recipe.label}</div>
        <button id = {index} onClick={this._handleClick}>Add to Favorites</button>
        </div>
      })}


      </div>
    )
  }
}

export default RecipeSearch;
