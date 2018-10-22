import React from 'react';
import './style/index.scss'
import SetEditor from './SetEditor';
import Timer from "./Timer";
import Sets from "./Sets";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSetEditor: true,
      enteredExercise: "",
      enteredSetsNum: 1,
      setsList: [],
      breakTime: 120,
      currentBreakTime: 120,
      isTimerRunning: false,
      editMode: false,
      editIndex: ""
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

  setEditorSelector = () => {
    return document.querySelector(".setEditor .inputAndButtons input");
  };

  saveSet = () => {
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
    this.setEditorSelector().value = "";
  };

  timerStart = () => {
    if (!this.state.isTimerRunning) {
      this.setState({isTimerRunning: true});
      this.timer = setInterval(() => {
          if (this.state.currentBreakTime !== 0) {
            this.setState({currentBreakTime: this.state.currentBreakTime - 1})
          }
          else {
            this.timerPause();
          }
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

  calculateSet = (index, operation) => {
    const setsNum = this.state.setsList[index].setsNum;
    const currentSet = this.state.setsList[index].currentSet;
    let calculatedSet;

    if (operation === "add")
      calculatedSet = currentSet < setsNum ? currentSet + 1 : currentSet;
    else if (operation === "subtract")
      calculatedSet = currentSet - 1 > 0 ? currentSet - 1 : currentSet;

    return calculatedSet;
  };

  addSet = (index) => {
    const updatedSets = this.state.setsList;
    updatedSets.splice(index, 1, {
      ...updatedSets[index],
      currentSet: this.calculateSet(index, "add")
    });
    this.setState({setsList: updatedSets});
  };

  subtractSet = (index) => {
    const updatedSets = this.state.setsList;
    updatedSets.splice(index, 1, {
      ...updatedSets[index],
      currentSet: this.calculateSet(index, "subtract")
    });
    this.setState({setsList: updatedSets});
  };

  editSet = (index) => {
    const set = this.state.setsList[index];
    this.setState({
      showSetEditor: true,
      editMode: true,
      editIndex: index,
      enteredExercise: set.exercise,
      enteredSetsNum: set.setsNum
    }, () => {
      this.fillInputField(set.exercise);
      this.setEditorSelector().focus();
    });

  };

  fillInputField = (exercise) => {
    this.setEditorSelector().value = exercise;
  };

  saveEditedSet = () => {
    const editedList = this.state.setsList;
    const editIndex = this.state.editIndex;
    editedList.splice(editIndex, 1, {
      ...editedList[editIndex],
      exercise: this.state.enteredExercise,
      setsNum: this.state.enteredSetsNum
    });
    this.setState({setsList: editedList, editMode: false});
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
    this.setState({showSetEditor: true, editMode: false}, this.resetSetEditor);
  };

  resetSetEditor = () => {
    this.setEditorSelector().value = "";
    this.setEditorSelector().focus();
  };

  render() {
    const blur = this.state.showSetEditor ? "blur" : "";
    return (
      <main>
        <div className={blur}/>
        <SetEditor enterExercise={this.enterExercise}
                   enterSetsNum={this.enterSetsNum}
                   saveSet={this.saveSet}
                   saveEditedSet={this.saveEditedSet}
                   hideSetEditor={this.hideSetEditor}
                   showSetEditor={this.state.showSetEditor}
                   editMode={this.state.editMode}
                   enteredSetsNum={this.state.enteredSetsNum}
        />
        <Timer currentBreakTime={this.state.currentBreakTime}
               isTimerRunning={this.state.isTimerRunning}
               timerStart={this.timerStart}
               timerPause={this.timerPause}
               timerStop={this.timerStop}
               addTime={this.addTime}
        />
        <Sets setsList={this.state.setsList}
              addSet={this.addSet}
              subtractSet={this.subtractSet}
              editSet={this.editSet}
              doneSet={this.doneSet}
        />
        <figure className="addSetButton">
          <button onClick={this.showSetEditor}>
            <img src="add.svg"
                 alt="add"
            />
          </button>
        </figure>
      </main>
    )
  }
}
