import React, { Component } from 'react';
import './style/index.scss';
import SetEditor from './SetEditor';
import Timer from './Timer';
import Sets from './Sets';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSetEditor: true,
      enteredExercise: '',
      enteredSetsNum: 1,
      setsList: [],
      breakTime: 120,
      currentBreakTime: 120,
      isTimerRunning: false,
      editMode: false,
      editIndex: '',
    };
  }

  enterExercise = (input) => {
    const inputVal = input.target.value;
    this.setState({ enteredExercise: inputVal });
  };

  enterSetsNum = (number) => {
    const checkedNumber = number.target.value;
    this.setState({ enteredSetsNum: checkedNumber });
  };

  setEditorSelector = () => (
    document.querySelector('.setEditor .inputAndButtons input')
  );

  saveSet = () => {
    const { setsList, enteredExercise, enteredSetsNum } = this.state;
    setsList.push({
      exercise: enteredExercise,
      setsNum: enteredSetsNum,
      currentSet: 1,
    });
    this.setState({
      setsList,
      enteredExercise: '',
    });
    this.setEditorSelector().value = '';
  };

  timerStart = () => {
    const { isTimerRunning, currentBreakTime } = this.state;
    if (!isTimerRunning) {
      this.setState({ isTimerRunning: true });
      this.timer = setInterval(() => {
        if (currentBreakTime !== 0) {
          this.setState(prevState => ({
            currentBreakTime: prevState.currentBreakTime - 1,
          }));
        } else {
          this.timerPause();
        }
      }, 1000);
    }
  };

  timerPause = () => {
    this.setState({ isTimerRunning: false });
    clearInterval(this.timer);
  };

  timerStop = () => {
    const { breakTime } = this.state;
    this.timerPause();
    this.setState({ currentBreakTime: breakTime });
  };

  addTime = (time) => {
    let { currentBreakTime } = this.state;
    currentBreakTime += time;

    if (currentBreakTime > 599) {
      this.setState({ breakTime: 599, currentBreakTime: 599 });
    } else if (currentBreakTime < 0) {
      this.setState({ breakTime: 0, currentBreakTime: 0 });
    } else {
      this.setState({ breakTime: currentBreakTime, currentBreakTime });
    }
  };

  calculateSet = (index, operation) => {
    const { setsList } = this.state;
    const { setsNum, currentSet } = setsList[index];
    let calculatedSet;

    if (operation === 'add') {
      calculatedSet = currentSet < setsNum ? currentSet + 1 : currentSet;
    } else if (operation === 'subtract') {
      calculatedSet = currentSet - 1 > 0 ? currentSet - 1 : currentSet;
    }

    return calculatedSet;
  };

  addSet = (index) => {
    const { setsList } = this.state;
    setsList.splice(index, 1, {
      ...setsList[index],
      currentSet: this.calculateSet(index, 'add'),
    });
    this.setState({ setsList });
  };

  subtractSet = (index) => {
    const { setsList } = this.state;
    setsList.splice(index, 1, {
      ...setsList[index],
      currentSet: this.calculateSet(index, 'subtract'),
    });
    this.setState({ setsList });
  };

  editSet = (index) => {
    const { setsList } = this.state;
    const set = setsList[index];

    this.setState({
      showSetEditor: true,
      editMode: true,
      editIndex: index,
      enteredExercise: set.exercise,
      enteredSetsNum: set.setsNum,
    }, () => {
      this.fillInputField(set.exercise);
      this.setEditorSelector().focus();
    });
  };

  fillInputField = (exercise) => {
    this.setEditorSelector().value = exercise;
  };

  saveEditedSet = () => {
    const {
      setsList,
      editIndex,
      enteredExercise,
      enteredSetsNum,
    } = this.state;

    setsList.splice(editIndex, 1, {
      ...setsList[editIndex],
      exercise: enteredExercise,
      setsNum: enteredSetsNum,
    });

    this.setState({ setsList, editMode: false });
  };

  doneSet = (index) => {
    const { setsList } = this.state;
    setsList.splice(index, 1);
    this.setState({ setsList });
  };

  hideSetEditor = () => {
    this.setState({ showSetEditor: false, editMode: false });
  };

  showSetEditor = () => {
    this.setState({ showSetEditor: true, editMode: false }, this.resetSetEditor);
  };

  resetSetEditor = () => {
    this.setEditorSelector().value = '';
    this.setEditorSelector().focus();
  };

  render() {
    const {
      showSetEditor,
      editMode,
      enteredSetsNum,
      currentBreakTime,
      isTimerRunning,
      setsList,
    } = this.state;

    const blur = showSetEditor ? 'blur' : '';

    return (
      <main>
        <div className={blur} />
        <SetEditor
          enterExercise={this.enterExercise}
          enterSetsNum={this.enterSetsNum}
          saveSet={this.saveSet}
          resetSetEditor={this.resetSetEditor}
          saveEditedSet={this.saveEditedSet}
          hideSetEditor={this.hideSetEditor}
          showSetEditor={showSetEditor}
          editMode={editMode}
          enteredSetsNum={enteredSetsNum}
        />
        <Timer
          currentBreakTime={currentBreakTime}
          isTimerRunning={isTimerRunning}
          timerStart={this.timerStart}
          timerPause={this.timerPause}
          timerStop={this.timerStop}
          addTime={this.addTime}
        />
        <Sets
          setsList={setsList}
          addSet={this.addSet}
          subtractSet={this.subtractSet}
          editSet={this.editSet}
          doneSet={this.doneSet}
        />
        <figure className="addSetButton">
          <button onClick={this.showSetEditor}>
            <img
              src="add.svg"
              alt="add"
            />
          </button>
        </figure>
      </main>
    );
  }
}
