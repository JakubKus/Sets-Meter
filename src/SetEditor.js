import React from 'react';
import NumberButton from "./NumberButton";

export default class SetEditor extends React.Component {
  render() {
    const showSetEditor = this.props.showSetEditor ? "setEditor" : "hide";
    const editHide = this.props.editMode ? "hide" : "";
    const editShow = this.props.editMode ? "" : "hide";
    return (
      <figure className={showSetEditor}>
        <button onClick={this.props.hideSetEditor}
                className="close"
        >
          <img src="close.svg" alt="close"/>
        </button>
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
            className={editHide}
          >
            Done
          </button>
          <button onClick={this.props.addSet} className={editHide}>Next</button>
          <button
            onClick={() => {
              this.props.addEditedSet();
              this.props.hideSetEditor();
            }}
            className={editShow}
          >
            Done
          </button>
        </div>
        <div className="numbers">
          <div>
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="1"
            />
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="2"
            />
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="3"
            />
          </div>
          <div>
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="4"
            />
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="5"
            />
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="6"
            />
          </div>
          <div>
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="7"
            />
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="8"
            />
            <NumberButton enterSetsNum={this.props.enterSetsNum}
                          enteredSetsNum={this.props.enteredSetsNum}
                          id="9"
            />
          </div>
        </div>
      </figure>
    )
  }
}