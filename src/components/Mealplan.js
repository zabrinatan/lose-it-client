import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Mealplan extends Component {
  constructor(){
    super();
    this.state ={
    }
  }
  render(){
    return(
      <div>
        <table>
          <thead>
          <tr>
          <th></th>
          <th>Sunday</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Breakfast</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

            </tr>
            <tr>
            <td>Lunch</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>

            <tr>
            <td>Dinner </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Mealplan;
