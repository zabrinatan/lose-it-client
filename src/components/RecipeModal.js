import React, { Component } from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root')

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    padding               : '0',

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
                <div className="recipe-title"><h3>{item.label}</h3></div>
                  <img className="recipe-image" src={item.image}/>
                  <table id="nutrients">
                  <thead>
                    <tr>
                      <th>Nutrients</th>
                      <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td>Total Calories</td>
                      <td>{(parseFloat(item.calories) / parseFloat(item.yield)).toFixed(0)} cal</td>
                      </tr>
                      <tr>
                        <td>Total Carbohydrates</td>
                        <td>{(parseFloat(item.carbs) / parseFloat(item.yield)).toFixed(0)} g</td>
                      </tr>
                      <tr>
                        <td>Total Proteins</td>
                        <td>{(parseFloat(item.proteins) / parseFloat(item.yield)).toFixed(0)} g</td>
                      </tr>
                      <tr>
                        <td>Total Fats</td>
                        <td>{(parseFloat(item.fats) / parseFloat(item.yield)).toFixed(0)} g</td>
                      </tr>
                    </tbody>
                  </table>
                  <div id="modal-buttons">
                    <a id = "view-recipe" href = {item.url} target= "_blank"><button>View Recipe</button></a>
                    <button id="select-recipe" onClick={handleClick.bind(this, item.label)}>Select this recipe </button>
                  </div>
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
