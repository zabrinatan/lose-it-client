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
import User from './components/User'
import EditUser from './components/EditUser'
export const history = createBrowserHistory()

const Routes = (
  <Router>
    <div>
      <Route exact path = "/" component = {Home} />
      <Route exact path = '/user' component = {User} />
      <Route exact path = '/user/editpage' component = {EditUser} />
      <Route exact path = '/search' component = {RecipeSearch} />
      <Route exact path = '/my-recipes' component = {MyRecipes} />
      <Route exact path = '/login' component = {Login} />
      <Route exact path = '/register' component = {Register} />

    </div>
  </Router>
)

export default Routes;
