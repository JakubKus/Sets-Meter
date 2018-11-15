import React, { Component } from 'react';
import './style/index.scss';
import SetEditor from './SetEditor';
import Header from './Header';
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
      notifyMode: 'sw',
      showNotifyInstr: false,
      notifyStatus: false,
      editMode: false,
      editIndex: '',
    };

    this.setEditorInput = null;

    this.setEditorRef = (ref) => {
      this.setEditorInput = ref;
    };
  }

  componentDidMount() {
    this.focusSetEditor();
  }

  enterExercise = (input) => {
    const { value } = input.target;
    this.setState({ enteredExercise: value });
  };

  enterSetsNum = (number) => {
    const { value } = number.target;
    this.setState({ enteredSetsNum: value });
  };

  clearSetEditor = () => {
    this.setState({ enteredExercise: '' });
  };

  focusSetEditor = () => {
    this.setEditorInput.focus();
  };

  addSet = () => {
    const { setsList, enteredExercise, enteredSetsNum } = this.state;
    setsList.push({
      exercise: enteredExercise,
      setsNum: enteredSetsNum,
    });
    this.setState({ setsList });
  };

  timerStart = () => {
    const { isTimerRunning } = this.state;
    if (!isTimerRunning) {
      this.setState({ isTimerRunning: true });
      this.timer = setInterval(() => {
        const { currentBreakTime } = this.state;
        if (currentBreakTime > 0) {
          this.setState(prevState => (
            { currentBreakTime: prevState.currentBreakTime - 1 }
          ));
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

  changeNotifyMode = (mode) => {
    this.setState({ notifyMode: mode });
  };

  toggleNotifyInstr = () => {
    const { showNotifyInstr } = this.state;
    this.setState({ showNotifyInstr: !showNotifyInstr });
  };

  startNotifyTimer = () => {
    this.setState({ notifyStatus: true });
    const { setsList, breakTime, notifyMode } = this.state;
    const options = {
      vibrate: 100,
      data: { setsList, breakTime, notifyMode },
      actions: [{ action: 'Exercises notification', title: 'Start' }],
    };

    if ('serviceWorker' in navigator) {
      Notification.requestPermission()
        .then(() => navigator.serviceWorker.register('/sw.js'))
        .then(() => navigator.serviceWorker.ready
          .then(s => (
            s.showNotification('Click to begin', options)
          )))
        .catch(e => console.log(e.message));
    }
  };

  stopNotifyTimer = () => {
    this.setState({ notifyStatus: false });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => reg.unregister());
    }
  };

  decreaseSetsNum = (index) => {
    const { setsList } = this.state;
    const set = setsList[index];
    const { setsNum } = set;

    if (setsNum > 1) {
      setsList.splice(index, 1, {
        ...set,
        setsNum: setsNum - 1,
      });
    }

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
      this.focusSetEditor();
    });
  };

  addEditedSet = () => {
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

  deleteSet = (index) => {
    const { setsList } = this.state;
    setsList.splice(index, 1);
    this.setState({ setsList });
  };

  showSetEditor = () => {
    this.setState({
      showSetEditor: true,
      editMode: false,
      enteredExercise: '',
    }, () => this.focusSetEditor());
  };

  hideSetEditor = () => {
    this.setState({ showSetEditor: false, editMode: false });
  };

  render() {
    const {
      showSetEditor,
      enteredExercise,
      enteredSetsNum,
      setsList,
      currentBreakTime,
      isTimerRunning,
      notifyMode,
      showNotifyInstr,
      notifyStatus,
      editMode,
    } = this.state;

    const blur = showSetEditor ? 'blur on' : 'blur off';
    return (
      <main>
        <Header
          currentBreakTime={currentBreakTime}
          isTimerRunning={isTimerRunning}
          timerStart={this.timerStart}
          timerPause={this.timerPause}
          timerStop={this.timerStop}
          addTime={this.addTime}
          notifyMode={notifyMode}
          changeNotifyMode={this.changeNotifyMode}
          showNotifyInstr={showNotifyInstr}
          toggleNotifyInstr={this.toggleNotifyInstr}
          notifyStatus={notifyStatus}
          startNotifyTimer={this.startNotifyTimer}
          stopNotifyTimer={this.stopNotifyTimer}
        />
        <div className={blur} />
        <SetEditor
          showSetEditor={showSetEditor}
          setEditorRef={this.setEditorRef}
          enterExercise={this.enterExercise}
          enteredExercise={enteredExercise}
          enterSetsNum={this.enterSetsNum}
          enteredSetsNum={enteredSetsNum}
          clearSetEditor={this.clearSetEditor}
          focusSetEditor={this.focusSetEditor}
          addSet={this.addSet}
          editMode={editMode}
          addEditedSet={this.addEditedSet}
          hideSetEditor={this.hideSetEditor}
        />
        <Sets
          setsList={setsList}
          decreaseSetsNum={this.decreaseSetsNum}
          editSet={this.editSet}
          deleteSet={this.deleteSet}
        />
        <div className="addSetButton">
          <button onClick={this.showSetEditor}>
            <img src="add.svg" alt="add" />
          </button>
        </div>
      </main>
    );
  }
}
