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
      enteredExercise: "",
      enteredSetsNum: 1,
      setsList: []
    }
  }

  timerStart = () => {
    if(!this.state.isTimerRunning) {
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
    const actualTime = this.state.breakTime + time;
    if (actualTime > 599)
      this.setState({breakTime: 599, currentBreakTime: 599});
    else if (actualTime < 0)
      this.setState({breakTime: 0, currentBreakTime: 0});
    else
      this.setState({breakTime: actualTime, currentBreakTime: actualTime});
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

  doneSet = (index) => {
    const updatedSets = this.state.setsList;
    updatedSets.splice(index, 1);
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
              doneSet={this.doneSet}/>
        <SetEditor enterExercise={this.enterExercise}
                   enterSetsNum={this.enterSetsNum}
                   addSet={this.addSet}
                   hideSetEditor={this.hideSetEditor}
        />
      </div>
    )
  }
}

ReactDOM.render( <App/>, document.getElementById('root'));