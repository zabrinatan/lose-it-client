import React, { Component } from 'react';
import Header from './Header'
// import banner from '../lose-it.png';
// import loseit from '../lose-it-banner.png'
class Home extends Component {

  render() {
    return(
      <div>
      <Header />
      <div id="home-container">
        <h1 id="title"> Lose it!</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/GnfTHsdTodA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>


      </div>
    );
  }
};

export default Home;
