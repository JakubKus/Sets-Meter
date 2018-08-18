import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css'
import ExerciseEditor from './ExerciseEditor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showExerciseEditor: true,
      enteredExercise: "",
      enteredSetsNum: 1,
      exercisesList: []
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

  addExercise = () => {
    const newExercise = this.state.exercisesList;
    newExercise.push({
      exercise: this.state.enteredExercise,
      sets: this.state.enteredSetsNum
    });
    this.setState({
      exercisesList: newExercise,
      enteredExercise: "",
      enteredSetsNum: 1
    });
    document.querySelector(".exerciseEditor input").value = "";
  };

  hideExerciseEditor = () => {
    this.setState({showExerciseEditor: false})
  };

  render() {
    return (
      <div>
        <ExerciseEditor
          enterExercise={this.enterExercise}
          enterSetsNum={this.enterSetsNum}
          addExercise={this.addExercise}
          hideExerciseEditor={this.hideExerciseEditor}
        />
      </div>
    )
  }
}

ReactDOM.render( <App/>, document.getElementById('root'));