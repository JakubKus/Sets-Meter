import React from 'react';

export default class SetEditor extends React.Component {
  render() {
    return (
      <figure className="setEditor">
        <button onClick={this.props.hideSetEditor}
                className="close"
        ><img src="close.svg" alt="close"/></button>
        <div className="inputAndButtons">
          <input onChange={this.props.enterExercise}
                 placeholder="Enter exercise"
                 type="text"
          />
          <button
            onClick={() => {
              this.props.addSet();
              this.props.hideSetEditor();
            }}
          >
            Done
          </button>
          <button onClick={this.props.addSet}>Next</button>
        </div>
        <div className="numbers">
          <div>
            <button onClick={this.props.enterSetsNum} value="1">1</button>
            <button onClick={this.props.enterSetsNum} value="2">2</button>
            <button onClick={this.props.enterSetsNum} value="3">3</button>
          </div>
          <div>
            <button onClick={this.props.enterSetsNum} value="4">4</button>
            <button onClick={this.props.enterSetsNum} value="5">5</button>
            <button onClick={this.props.enterSetsNum} value="6">6</button>
          </div>
          <div>
            <button onClick={this.props.enterSetsNum} value="7">7</button>
            <button onClick={this.props.enterSetsNum} value="8">8</button>
            <button onClick={this.props.enterSetsNum} value="9">9</button>
          </div>
        </div>
      </figure>
    )
  }
}