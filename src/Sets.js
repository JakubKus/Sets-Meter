import React from 'react';

export default class Sets extends React.Component {
  render() {
    const sets = this.props.setsList.map((set, index) => {
      return (
        <div key={index}>
          <button className="subtractSet">-</button>
          <div className="setsMeter">
            <span className="actualSet">1</span>
            <span>/{set.setsNum}</span>
          </div>
          <button className="addSet">+</button>
          <span className="exerciseName">{set.exercise}</span>
          <button className="setEdit">Edit</button>
          <button className="setDone">Done</button>
        </div>
      )
    });
    return (
      <div className="sets">
        {sets}
      </div>
    )
  }
}