import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { history } from '../Routes'



class Nav extends Component {

  _logOut = () => {
    localStorage.clear()
    history.push({
      pathname: '/',
    })
  }

  forceUpdate = () => {
    this.forceUpdate()
  }


  render () {
    return (
      <div className='navbar'>
        <ul className='navlist'>
          <Link to={`/`} className='navlink'>Home</Link>
          {localStorage.getItem('jwt') == null ? false : <p>{localStorage.getItem('username')}</p>}
          <Link to={`/my-recipes`} onCLick={this.forceUpdate} className='navlink'>My Recipes</Link>
          <Link to={`/search`} className='navlink'>Search Recipes</Link>

          {localStorage.getItem('jwt') == null ? false : <button  className="logout" onClick={this._logOut}>Log Out</button>}
          {localStorage.getItem('jwt') == null ? <Link to={`/login`} className='navlink'>Sign In</Link> : false}
          {localStorage.getItem('jwt') == null ? <Link to={`/register`} className='navlink'>Sign Up</Link> : false}
        </ul>
      </div>
    )
  }
}

export default Nav
