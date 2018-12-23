import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import TimerButtons from '../TimerButtons/TimerButtons';
import Timer from '../Timer/Timer';
import NotifySettings from '../NotifySettings/NotifySettings';
import SetEditor from '../SetEditor/SetEditor';
import Sets from '../Sets/Sets';
import '../../index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      showSetEditor: true,
      enteredExercise: '',
      enteredSetsNum: 1,
      setsList: cookies.get('setsList') || [],
      showTimerButtons: false,
      breakTime: +cookies.get('breakTime') || 120,
      currentBreakTime: +cookies.get('breakTime') || 120,
      isTimerRunning: false,
      showNotifySettings: false,
      notifyMode: cookies.get('notifyMode') || 'sw',
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
    document.addEventListener('keydown', this.hideSetEditor, false);
    document.addEventListener('keydown', this.toggleNotifyInstr, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.hideSetEditor, false);
    document.removeEventListener('keydown', this.toggleNotifyInstr, false);
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
    this.setCookie('setsList', setsList);
  };

  toggleTimerButtons = () => {
    const { showTimerButtons } = this.state;
    this.setState({ showTimerButtons: !showTimerButtons });
  };

  toggleNotifySettings = () => {
    const { showNotifySettings } = this.state;
    this.setState({ showNotifySettings: !showNotifySettings });
  };

  timerStart = () => {
    const { isTimerRunning, currentBreakTime } = this.state;
    const startTime = new Date().getTime();

    if (!isTimerRunning) {
      this.setState({ isTimerRunning: true });
      this.timer = setInterval(() => {
        const timePassed = Math.round((new Date().getTime() - startTime) / 1000);
        if (currentBreakTime - timePassed >= 0) {
          this.setState({ currentBreakTime: currentBreakTime - timePassed });
        } else {
          this.timerPause();
        }
      }, 250);
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
      this.setCookie('breakTime', 599);
    } else if (currentBreakTime < 0) {
      this.setState({ breakTime: 0, currentBreakTime: 0 });
    } else {
      this.setState({ breakTime: currentBreakTime, currentBreakTime });
      this.setCookie('breakTime', currentBreakTime);
    }
  };

  changeNotifyMode = (mode) => {
    this.setState({ notifyMode: mode });
    this.setCookie('notifyMode', mode);
  };

  toggleNotifyInstr = (e) => {
    const { showNotifyInstr } = this.state;

    if (e === undefined || e.keyCode === undefined) {
      this.setState({ showNotifyInstr: !showNotifyInstr });
    } else if (e.keyCode === 27) {
      this.setState({ showNotifyInstr: false });
    }
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
    this.setCookie('setsList', setsList);
  };

  deleteSet = (index) => {
    const { setsList } = this.state;
    setsList.splice(index, 1);
    this.setState({ setsList });
    this.setCookie('setsList', setsList);
  };

  showSetEditor = () => {
    this.setState({
      showSetEditor: true,
      editMode: false,
      enteredExercise: '',
    }, () => this.focusSetEditor());
  };

  hideSetEditor = (e) => {
    if (e === undefined || e.keyCode === undefined || e.keyCode === 27) {
      this.setState({ showSetEditor: false, editMode: false });
    }
  };

  setCookie = (cookieName, cookieValue) => {
    const { cookies } = this.props;
    const tenDays = 60 * 60 * 24 * 10;
    cookies.set(cookieName, cookieValue, { maxAge: tenDays });
  };

  resetSets = () => {
    this.setState({ setsList: [] });
  };

  gaEvent = (component, action) => {
    ReactGA.event({ category: component, action });
  };

  render() {
    const {
      showSetEditor,
      enteredExercise,
      enteredSetsNum,
      setsList,
      showTimerButtons,
      currentBreakTime,
      isTimerRunning,
      showNotifySettings,
      notifyMode,
      showNotifyInstr,
      notifyStatus,
      editMode,
    } = this.state;

    const blur = showSetEditor ? 'blur on' : 'blur off';
    return (
      <main>
        <Header
          showTimerButtons={showTimerButtons}
          toggleTimerButtons={this.toggleTimerButtons}
          resetSets={this.resetSets}
          showNotifySettings={showNotifySettings}
          toggleNotifySettings={this.toggleNotifySettings}
        />
        <TimerButtons
          showTimerButtons={showTimerButtons}
          currentBreakTime={currentBreakTime}
          isTimerRunning={isTimerRunning}
          timerStart={this.timerStart}
          timerPause={this.timerPause}
          timerStop={this.timerStop}
          addTime={this.addTime}
          gaEvent={this.gaEvent}
        />
        <Timer
          showTimerButtons={showTimerButtons}
          showNotifySettings={showNotifySettings}
          currentBreakTime={currentBreakTime}
          isTimerRunning={isTimerRunning}
          timerStart={this.timerStart}
          timerPause={this.timerPause}
          timerStop={this.timerStop}
          addTime={this.addTime}
          gaEvent={this.gaEvent}
        />
        <NotifySettings
          showNotifySettings={showNotifySettings}
          notifyMode={notifyMode}
          changeNotifyMode={this.changeNotifyMode}
          showNotifyInstr={showNotifyInstr}
          toggleNotifyInstr={this.toggleNotifyInstr}
          notifyStatus={notifyStatus}
          startNotifyTimer={this.startNotifyTimer}
          stopNotifyTimer={this.stopNotifyTimer}
          gaEvent={this.gaEvent}
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
          gaEvent={this.gaEvent}
        />
        <Sets
          setsList={setsList}
          decreaseSetsNum={this.decreaseSetsNum}
          editSet={this.editSet}
          deleteSet={this.deleteSet}
          gaEvent={this.gaEvent}
        />
        <div className="addSetButton">
          <button
            onClick={() => {
              this.gaEvent('App', 'Clicked add set button');
              this.showSetEditor();
            }}
          >
            <img src="add.svg" alt="add" />
          </button>
        </div>
      </main>
    );
  }
}

App.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(App);
