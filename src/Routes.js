import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
// import Home from './components/Home';
// import FAQ from './components/FAQ';
// import Character from './components/Character'
import { createBrowserHistory } from 'history'

import Home from './components/Home';
import RecipeSearch from './components/RecipeSearch';
import MyRecipes from './components/MyRecipes'
import Login from './components/Login'
import Register from './components/Register'
import RecipePlanning from './components/RecipePlanning';
import RecipeDetails from './components/RecipeDetails'
export const history = createBrowserHistory()
import User from './components/User'
const Routes = (
  <Router>
    <div>
      <Route exact path = "/" component = {Home} />
      <Route exact path = '/user' component = {User} />
      <Route exact path = '/search' component = {RecipeSearch} />
      <Route exact path = '/my-recipes' component = {MyRecipes} />
      <Route exact path = '/login' component = {Login} />
      <Route exact path = '/register' component = {Register} />
      <Route exact path = '/recipes/:id' component = {RecipeDetails}/>

    </div>
  </Router>
)

export default Routes;
