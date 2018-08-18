import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css'
import SetEditor from './SetEditor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSetEditor: true,
      enteredExercise: "",
      enteredSetsNum: 1,
      setsList: []
    }
  }

  enterExercise = (input) => {
    const inputVal = input.target.value;
    this.setState({enteredExercise: inputVal});
  };

  enterSetsNum = (number) => {
    const checkedNumber = number.target.value;
    this.setState({enteredSetsNum: checkedNumber});
  };

  addSet = () => {
    const newSet = this.state.setsList;
    newSet.push({
      exercise: this.state.enteredExercise,
      setsNum: this.state.enteredSetsNum
    });
    this.setState({
      setsList: newSet,
      enteredExercise: "",
      enteredSetsNum: 1
    });
    document.querySelector(".setEditor input").value = "";
  };

  hideSetEditor = () => {
    this.setState({showSetEditor: false})
  };

  render() {
    return (
      <div>
        <SetEditor
          enterExercise={this.enterExercise}
          enterSetsNum={this.enterSetsNum}
          addSet={this.addSet}
          hideSetEditor={this.hideSetEditor}
        />
      </div>
    )
  }
}

ReactDOM.render( <App/>, document.getElementById('root'));