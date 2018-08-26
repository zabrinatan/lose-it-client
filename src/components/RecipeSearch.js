import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  render(){
    return(
      <div onSubmit = {this._handleSubmit}>
      <form>
      <input type="Search" placeholder="Search" required onChange = {this._handleQuery}/>

      </form>
      <ul>
      {this.state.response.map((item)=> {
        return <li>{item.recipe.label}</li>
      })}
      </ul>

      </div>
    )
  }
}

export default RecipeSearch;
