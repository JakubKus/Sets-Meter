import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css'
import SetEditor from './SetEditor';
import Sets from "./Sets";
import Timer from "./Timer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 180,
      currentBreakTime: 180,
      isTimerRunning: false,
      showSetEditor: true,
      editMode: false,
      enteredExercise: "",
      enteredSetsNum: 1,
      setsList: [{exercise: "klata", setsNum: 3, currentSet: 3}], //to del
      editIndex: ""
    }
  }

  timerStart = () => {
    if (!this.state.isTimerRunning) {
      this.setState({isTimerRunning: true});
      this.timer = setInterval(() => {
          this.setState({currentBreakTime: this.state.currentBreakTime - 1})
        }, 1000
      );
    }
  };

  timerPause = () => {
    this.setState({isTimerRunning: false});
    clearInterval(this.timer);
  };

  timerStop = () => {
    this.timerPause();
    this.setState({currentBreakTime: this.state.breakTime});
  };

  addTime = (time) => {
    const currentTime = this.state.currentBreakTime + time;
    if (currentTime > 599)
      this.setState({breakTime: 599, currentBreakTime: 599});
    else if (currentTime < 0)
      this.setState({breakTime: 0, currentBreakTime: 0});
    else
      this.setState({breakTime: currentTime, currentBreakTime: currentTime});
  };

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
      setsNum: this.state.enteredSetsNum,
      currentSet: 1
    });
    this.setState({
      setsList: newSet,
      enteredExercise: "",
      enteredSetsNum: 1
    });
    document.querySelector(".setEditor input").value = "";
  };

  editSet = (index) => {
    const set = this.state.setsList[index];
    this.setState({
      showSetEditor: true,
      editMode: true,
      editIndex: index,
      enteredExercise: set.exercise,
      enteredSetsNum: set.setsNum
    }, () => {this.fillEditorFields(set.exercise)});
  };

  fillEditorFields = (exercise) => {
    document.querySelector(".setEditor .inputAndButtons input")
      .value = exercise;
  };

  addEditedSet = () => {
    const editedList = this.state.setsList;
    const editIndex = this.state.editIndex;
    editedList.splice(editIndex, 1, {
      ...editedList[editIndex],
      exercise: this.state.enteredExercise,
      setsNum: this.state.enteredSetsNum
    });
    this.setState({setsList: editedList, editMode: false});
    document.querySelector(".setEditor input").value = "";
  };

  doneSet = (index) => {
    const updatedSets = this.state.setsList;
    updatedSets.splice(index, 1);
    this.setState({setsList: updatedSets});
  };

  hideSetEditor = () => {
    this.setState({showSetEditor: false, editMode: false});
  };

  showSetEditor = () => {
    this.setState({showSetEditor: true, editMode: false});
  };

  calculateSet = (index, operation) => {
    const setsNum = this.state.setsList[index].setsNum;
    const currentSet = this.state.setsList[index].currentSet;
    let calculatedSet;
    if(operation === "plus") {
      calculatedSet = currentSet < setsNum ? currentSet + 1 : currentSet;
    }
    else if(operation === "minus") {
      calculatedSet = currentSet - 1 > 0 ? currentSet - 1 : currentSet;
    }
    return calculatedSet;
  };

  plusSet = (index) => {
    const updatedSets = this.state.setsList;
    updatedSets.splice(index, 1, {
      ...updatedSets[index],
      currentSet: this.calculateSet(index, "plus")
    });
    this.setState({setsList: updatedSets});
  };

  minusSet = (index) => {
    const updatedSets = this.state.setsList;
    updatedSets.splice(index, 1, {
      ...updatedSets[index],
      currentSet: this.calculateSet(index, "minus")
    });
    this.setState({setsList: updatedSets});
  };

  render() {
    return (
      <div>
        <Timer currentBreakTime={this.state.currentBreakTime}
               timerStart={this.timerStart}
               timerPause={this.timerPause}
               timerStop={this.timerStop}
               isTimerRunning={this.state.isTimerRunning}
               addTime={this.addTime}
        />
        <Sets setsList={this.state.setsList}
              editSet={this.editSet}
              doneSet={this.doneSet}
              plusSet={this.plusSet}
              minusSet={this.minusSet}
        />
        <SetEditor enterExercise={this.enterExercise}
                   enterSetsNum={this.enterSetsNum}
                   addSet={this.addSet}
                   hideSetEditor={this.hideSetEditor}
                   addEditedSet={this.addEditedSet}
                   showSetEditor={this.state.showSetEditor}
                   editMode={this.state.editMode}
                   enteredSetsNum={this.state.enteredSetsNum}
        />
        <figure className="addSetButton">
          <button onClick={this.showSetEditor}>
            <img src="add.svg" alt="add"/>
          </button>
        </figure>
      </div>
    )
  }
}

ReactDOM.render( <App/>, document.getElementById('root'));