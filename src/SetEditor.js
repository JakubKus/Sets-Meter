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
          <form action="javascript:void(0);">
            <input onChange={this.props.enterExercise}
                   placeholder="Enter exercise"
                   type="text"
            />
            <button onClick={this.props.saveSet}
                    className={editHide}
                    disabled={!!editHide}
            >
              Next
            </button>
            <button
              onClick={() => {
                this.props.saveSet();
                this.props.hideSetEditor();
              }}
              className={editHide}
              disabled={!!editHide}
            >
              Done
            </button>
            <button
              onClick={() => {
                this.props.saveEditedSet();
                this.props.hideSetEditor();
              }}
              className={editShow}
              disabled={!!editShow}
            >
              Done
            </button>
          </form>
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