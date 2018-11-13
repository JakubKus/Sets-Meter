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
      editMode: false,
      editIndex: '',
      notifyStatus: false,
    };

    this.setEditorInput = null;

    this.setEditorRef = (ref) => {
      this.setEditorInput = ref;
    };
  }

  enterExercise = (input) => {
    const { value } = input.target;
    this.setState({ enteredExercise: value });
  };

  enterSetsNum = (number) => {
    const { value } = number.target;
    this.setState({ enteredSetsNum: value });
  };

  addSet = () => {
    const { setsList, enteredExercise, enteredSetsNum } = this.state;
    setsList.push({
      exercise: enteredExercise,
      setsNum: enteredSetsNum,
    });
    this.setState({ setsList });
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

  clearSetEditor = () => {
    this.setState({ enteredExercise: '' });
  };

  focusSetEditor = () => {
    this.setEditorInput.focus();
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

  startNotifyTimer = () => {
    this.setState({ notifyStatus: true });
    const { setsList, breakTime } = this.state;
    const options = {
      vibrate: 100,
      data: { setsList, breakTime, activeBreak: false },
      actions: [{ action: 'Exercises notification', title: 'Start' }],
    };

    if ('serviceWorker' in navigator) {
      Notification.requestPermission()
        .then(() => navigator.serviceWorker.register('/sw.js'))
        .then(() => navigator.serviceWorker.ready
          .then((s) => {
            s.showNotification('Click to begin', options);
          }))
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

  render() {
    const {
      showSetEditor,
      editMode,
      enteredExercise,
      enteredSetsNum,
      setsList,
      notifyStatus,
    } = this.state;

    const blur = showSetEditor ? 'blur' : '';

    return (
      <main>
        <Header
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
          editMode={editMode}
          addSet={this.addSet}
          addEditedSet={this.addEditedSet}
          clearSetEditor={this.clearSetEditor}
          focusSetEditor={this.focusSetEditor}
          hideSetEditor={this.hideSetEditor}
        />
        <Sets
          setsList={setsList}
          decreaseSetsNum={this.decreaseSetsNum}
          editSet={this.editSet}
          deleteSet={this.deleteSet}
        />
        <figure className="addSetButton">
          <button onClick={this.showSetEditor}>
            <img src="add.svg" alt="add" />
          </button>
        </figure>
      </main>
    );
  }
}
