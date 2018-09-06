import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';

const SERVER_USER_URL = "http://localhost:3000/users.json"
const SERVER_UPDATE_USER = "http://localhost:3000/users/update"
const SERVER_USER_URL = "https://lose-weight.herokuapp.com/users.json"
const SERVER_UPDATE_USER = "https://lose-weight.herokuapp.com/update"

class EditUser extends Component {
  constructor(props){
    super(props);
    this.state ={
      user_id: '',
      first_name: '',
      last_name: '',
      weight: '',
      height: '',
      target_weight: '',
      calories: '',
      fats: '',
      proteins: '',
      carbs: '',
      response: []
    }
    this._handleFirstName = this._handleFirstName.bind(this);
    this._handleLastName = this._handleLastName.bind(this);
    this._handleWeight = this._handleWeight.bind(this);
    this._handleHeight = this._handleHeight.bind(this);
    this._handleTarget = this._handleTarget.bind(this);
    // this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

componentDidMount(){

  this.fetchUser();
}

fetchUser(){
  axios.get(SERVER_USER_URL, {headers: {
           "Authorization": localStorage.getItem('jwt')
         }
  }).then((response)=>{
      console.log(response)

      this.setState({
        user_id: localStorage.getItem('user_id'),
        response: response.data.users
      })


  }).then(()=> {
        this.state.response.map((item)=> {
          if(item.id == this.state.user_id){
            this.setState({
              weight: item.weight,
              height: item.height,
              first_name: item.first_name,
              last_name: item.last_name
            })
          }
        })

    })


  }


  _handleFirstName (e){
    this.setState({
      first_name: e.target.value
    })
  }

  _handleLastName (e){
    this.setState({
      last_name: e.target.value
    })
  }
  _handleWeight (e){
    this.setState({
      weight: e.target.value
    })
  }

  _handleHeight(e){
    this.setState({
      height: e.target.value
    })
  }
  _handleTarget(e){
    this.setState({
      target_weight: e.target.value
    })
  }

_handleClick(e){
  e.preventDefault();
  axios.post(SERVER_UPDATE_USER, {
    first_name: this.state.first_name,
    last_name: this.state.last_name,
    weight: this.state.weight,
    height: this.state.height,
    target_weight: this.state.target_weight,
    calories: this.state.calories,
    fats: this.state.fats,
    carbs: this.state.carbs,
    proteins: this.state.proteins
  }, {headers: {
           "Authorization": localStorage.getItem('jwt')
         }
  }).then(()=> {
    this.props.history.push('/user')}
    ).catch( (errors) => {
    console.log(errors)
  })
}
  render(){
    return(

      <div id="user-container">
      <Header />

        <form>
        <div id="user-details">
          <h3>User Details</h3>
        <div className="label-input">
        <label>First Name: </label>
        <input type="text" value = {this.state.first_name} onChange = {this._handleFirstName}/>
        </div>
        <div className="label-input">
        <label>Last Name</label>
        <input type="text"  value = {this.state.last_name} onChange = {this._handleLastName} />
        </div>
        <div className="label-input">
        <label>Weight(kg): </label>
        <input type = "number" value = {this.state.weight} onChange = {this._handleWeight} />
        </div>
        <div className="label-input">
        <label>Height(m): </label>
        <input type = "number" value = {this.state.height} onChange = {this._handleHeight} />
        </div>
        <div className="label-input">
        <label>Target Weight(kg): </label>
        <input type = "number" value = {this.state.target_weight} onChange = {this._handleTarget} />
        </div>
        </div>

        <div id="daily-limits">
        <h3>Daily Limits</h3>
        <div className="label-input">
        <label>Daily Calorie Limit </label>
        <input type="text" value = {this.state.calories} onChange = {(e) => this.setState({ calories: e.target.value })}/>
        </div>
        <div className="label-input">
        <label> Daily Carbohydrate Limit </label>
        <input type = "text" value = {this.state.carbs} onChange = {(e) => this.setState({ carbs: e.target.value })}/>
        </div>
        <div className="label-input">
        <label> Daily Protein Limit </label>
        <input type= "text" value = {this.state.proteins} onChange = {(e) => this.setState({ proteins: e.target.value })}/>
        </div>
        <div className="label-input">
        <label> Daily Fat Limit </label>
        <input type= "text" value = {this.state.fats} onChange = {(e) => this.setState({ fats: e.target.value })}/>
        </div>
        </div>
        <div id="edit-profile-button">
        <button onClick = {this._handleClick}>Save Changes</button>
        </div>
        </form>

      </div>
    )
  }
}

export default EditUser;
