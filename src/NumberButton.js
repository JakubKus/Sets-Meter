import React from 'react';

export default class NumberButton extends React.Component {
  render() {
    const activeNumber = this.props.enteredSetsNum.toString();
    const id = this.props.id;
    const checked = activeNumber === id ? "checked" : "";
    return (
      <button onClick={this.props.enterSetsNum}
              className={checked}
              value={id}
      >
        {id}
      </button>
    )
  }
}