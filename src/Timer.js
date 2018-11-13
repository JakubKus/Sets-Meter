import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 120,
      currentBreakTime: 120,
      isTimerRunning: false,
    };
  }

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

  render() {
    const { isTimerRunning, currentBreakTime } = this.state;
    const arrow = isTimerRunning ? 'invisible' : '';
    const breakTime = currentBreakTime;
    const breakMins = Math.floor(breakTime / 60);
    const breakTenSecs = Math.floor((breakTime - (breakMins * 60)) / 10);
    const breakSecs = breakTime - (breakMins * 60) - (breakTenSecs * 10);

    return (
      <div className="timer">
        <div className="controlButtons">
          <button
            onClick={this.timerStart}
            className="start"
          >
            <img
              src="start.svg"
              alt="start"
            />
          </button>
          <button
            onClick={this.timerPause}
            className="pause"
          >
            <img
              src="pause.svg"
              alt="pause"
            />
          </button>
          <button
            onClick={this.timerStop}
            className="stop"
          >
            <img
              src="stop.svg"
              alt="stop"
            />
          </button>
        </div>
        <div className="time">
          <span className="mins">
            <button
              onClick={() => { this.addTime(60); }}
              className={arrow}
            >
              <img
                src="arrow-up.svg"
                alt="up"
              />
            </button>
            {breakMins}
            <button
              onClick={() => { this.addTime(-60); }}
              className={arrow}
            >
              <img
                src="arrow-down.svg"
                alt="down"
              />
            </button>
          </span>
          <span>:</span>
          <span className="tenSecs">
            <button
              onClick={() => { this.addTime(10); }}
              className={arrow}
            >
              <img
                src="arrow-up.svg"
                alt="up"
              />
            </button>
            {breakTenSecs}
            <button
              onClick={() => { this.addTime(-10); }}
              className={arrow}
            >
              <img
                src="arrow-down.svg"
                alt="down"
              />
            </button>
          </span>
          <span className="secs">
            <button
              onClick={() => { this.addTime(1); }}
              className={arrow}
            >
              <img
                src="arrow-up.svg"
                alt="up"
              />
            </button>
            {breakSecs}
            <button
              onClick={() => { this.addTime(-1); }}
              className={arrow}
            >
              <img
                src="arrow-down.svg"
                alt="down"
              />
            </button>
          </span>
        </div>
      </div>
    );
  }
}
