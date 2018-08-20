import React from 'react';

export default class Sets extends React.Component {
  render() {
    const sets = this.props.setsList.map((set, index) => {
      return (
        <div key={index}>
          <button className="subtractSet">
            <img src="subtract.svg" alt="subtract"/>
          </button>
          <div className="setsMeter">
            <span className="actualSet">1</span>
            <span>/{set.setsNum}</span>
          </div>
          <button className="addSet">
            <img src="add.svg" alt="add"/>
          </button>
          <span className="exerciseName">{set.exercise}</span>
          <button className="setEdit">
            <img src="edit.svg" alt="edit"/>
          </button>
          <button className="setDone"
                  onClick={() => {this.props.doneSet(index)}}
          >
            <img src="done.svg" alt="done"/>
          </button>
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