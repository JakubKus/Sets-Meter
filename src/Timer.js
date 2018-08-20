import React from 'react';

export default class Timer extends React.Component {
  render() {
    const breakTime = this.props.currentBreakTime;
    const breakMins = Math.floor(breakTime / 60);
    const breakTenSecs = Math.floor((breakTime - (breakMins * 60)) / 10);
    const breakSecs = breakTime - (breakMins * 60) - (breakTenSecs * 10);
    const isTimerRunning = this.props.isTimerRunning;
    return (
      <div className="timer">
        <button onClick={this.props.timerStart}
                disabled={isTimerRunning}
                className="start">
          <img src="start.svg" alt="start"/>
        </button>
        <button onClick={this.props.timerPause}
                disabled={!isTimerRunning}
                className="pause">
          <img src="pause.svg" alt="pause"/>
        </button>
        <button onClick={this.props.timerStop}
                disabled={!isTimerRunning}
                className="stop"
        >
          <img src="stop.svg" alt="stop"/>
        </button>
        <span className="mins">
          <button onClick={() => {this.props.addTime(60)}}
                  disabled={isTimerRunning}
                  className="up"
          >
            <img src="arrow-up.svg" alt="up"/>
          </button>
          {breakMins}
          <button onClick={() => {this.props.addTime(-60)}}
                  disabled={isTimerRunning}
                  className="down"
          >
            <img src="arrow-down.svg" alt="down"/>
          </button>
        </span>
        <span>:</span>
        <span className="tenSecs">
          <button onClick={() => {this.props.addTime(10)}}
                  disabled={isTimerRunning}
                  className="up"
          >
            <img src="arrow-up.svg" alt="up"/>
          </button>
          {breakTenSecs}
          <button onClick={() => {this.props.addTime(-10)}}
                  disabled={isTimerRunning}
                  className="down"
          >
            <img src="arrow-down.svg" alt="down"/>
          </button>
        </span>
        <span className="secs">
          <button onClick={() => {this.props.addTime(1)}}
                  disabled={isTimerRunning}
                  className="up"
          >
            <img src="arrow-up.svg" alt="up"/>
          </button>
          {breakSecs}
          <button onClick={() => {this.props.addTime(-1)}}
                  disabled={isTimerRunning}
                  className="down"
          >
            <img src="arrow-down.svg" alt="down"/>
          </button>
        </span>
      </div>
    )
  }
}