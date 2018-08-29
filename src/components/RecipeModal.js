import React, { Component } from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root')

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class RecipeModal extends Component {
  render() {
    const { currentRecipe, favourites, handleClick } = this.props
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <div id = "result-list">
          {favourites.filter((item, index) => index == currentRecipe).map((item, index)=> {
            return (
              <div key={index}>
                <div className={`box ${index}`} id={item.label} >
                  <img className="recipe-image" src={item.image}/>
                  <div className="recipe-label">{item.label}</div>
                  <a href = {item.url} target= "_blank"><button>View Recipe</button></a>
                  <p>Calories: {(parseFloat(item.calories) / parseFloat(item.yield)).toFixed(0)}cal</p>
                  <p>Carbs: {(parseFloat(item.carbs) / parseFloat(item.yield)).toFixed(0)}g</p>
                  <p>Proteins: {(parseFloat(item.proteins) / parseFloat(item.yield)).toFixed(0)}g</p>
                  <p>Fats: {(parseFloat(item.fats) / parseFloat(item.yield)).toFixed(0)}g</p>
                  <button onClick={handleClick.bind(this, item.label)}>Select this recipe </button>
                </div>
              </div>
            )
          })}
        </div>
      </Modal>
    )
  }
}

export default RecipeModal;
