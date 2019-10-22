import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';
import Drop from './Drop'

const items = () => {
  let itemsData = []
  for(var i = 1; i <= 50 ; i++){
      itemsData.push({
          id: i,
          name: `item-${i}`
      })
  }
  return itemsData
}

const Counter = props => (
  <div>
    <h1>Counter</h1>

    <p>This is a simple example of a React component.</p>

    <p>Current count: <strong>{props.count}</strong></p>

    <button onClick={props.increment}>Increment</button>

    {/* demo dropdown */}
    <h2>Dropdown</h2>
      <Drop 
        options = {items()}
      />
  </div>
);

export default connect(
  state => state.counter,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Counter);
