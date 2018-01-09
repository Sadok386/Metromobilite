import React from 'react';
import AddVeggieForm from './AddVeggieForm';

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <p>Inventory</p>
        <AddVeggieForm addVeggie={this.props.addVeggie}/>
        <button onClick={this.props.loadSamples}>Charger des légumes</button>
      </div>
    )
  }
}

export default Inventory;
