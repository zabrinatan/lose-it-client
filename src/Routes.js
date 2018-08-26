import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
// import Home from './components/Home';
// import FAQ from './components/FAQ';
// import Character from './components/Character'

import Home from './components/Home';
import RecipeSearch from './components/RecipeSearch';
import MyRecipes from './components/MyRecipes'


const Routes = (
  <Router>
    <div>
      <Route exact path = "/" component = {Home} />
      <Route exact path = '/search' component = {RecipeSearch} />
      <Route exact path = '/my-recipes' component = {MyRecipes} />
    </div>
  </Router>
)

export default Routes;
