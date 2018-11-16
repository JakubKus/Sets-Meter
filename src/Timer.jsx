import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({
  currentBreakTime,
  isTimerRunning,
  timerStart,
  timerPause,
  timerStop,
  addTime,
  notifyStatus,
  gaEvent,
}) => {
  const arrow = isTimerRunning ? 'invisible' : '';
  const breakMins = Math.floor(currentBreakTime / 60);
  const breakTenSecs = Math.floor((currentBreakTime - (breakMins * 60)) / 10);
  const breakSecs = currentBreakTime - (breakMins * 60) - (breakTenSecs * 10);

  return (
    <div className={notifyStatus ? 'timer hidden' : 'timer'}>
      <div className="controlButtons">
        <button
          onClick={() => {
            gaEvent('Timer', 'Start');
            timerStart();
          }}
          className="start"
        >
          <img src="start.svg" alt="start" />
        </button>
        <button
          onClick={() => {
            gaEvent('Timer', 'Pause');
            timerPause();
          }}
          className="pause"
        >
          <img src="pause.svg" alt="pause" />
        </button>
        <button
          onClick={() => {
            gaEvent('Timer', 'Stop');
            timerStop();
          }}
          className="stop"
        >
          <img src="stop.svg" alt="stop" />
        </button>
      </div>
      <div className="time">
        <span className="mins">
          <button
            onClick={() => {
              gaEvent('Timer', 'Increased time by 1 minute');
              addTime(60);
            }}
            className={arrow}
          >
            <img src="arrow-up.svg" alt="up" />
          </button>
          {breakMins}
          <button
            onClick={() => {
              gaEvent('Timer', 'Decreased time by 1 minute');
              addTime(-60);
            }}
            className={arrow}
          >
            <img src="arrow-down.svg" alt="down" />
          </button>
        </span>
        <span>:</span>
        <span className="tenSecs">
          <button
            onClick={() => {
              gaEvent('Timer', 'Increased time by 10 seconds');
              addTime(10);
            }}
            className={arrow}
          >
            <img src="arrow-up.svg" alt="up" />
          </button>
          {breakTenSecs}
          <button
            onClick={() => {
              gaEvent('Timer', 'Decreased time by 10 seconds');
              addTime(-10);
            }}
            className={arrow}
          >
            <img src="arrow-down.svg" alt="down" />
          </button>
        </span>
        <span className="secs">
          <button
            onClick={() => {
              gaEvent('Timer', 'Increased time by 1 second');
              addTime(1);
            }}
            className={arrow}
          >
            <img src="arrow-up.svg" alt="up" />
          </button>
          {breakSecs}
          <button
            onClick={() => {
              gaEvent('Timer', 'Decreased time by 1 second');
              addTime(-1);
            }}
            className={arrow}
          >
            <img src="arrow-down.svg" alt="down" />
          </button>
        </span>
      </div>
    </div>
  );
};

Timer.propTypes = {
  currentBreakTime: PropTypes.number.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  timerStart: PropTypes.func.isRequired,
  timerPause: PropTypes.func.isRequired,
  timerStop: PropTypes.func.isRequired,
  addTime: PropTypes.func.isRequired,
  notifyStatus: PropTypes.bool.isRequired,
  gaEvent: PropTypes.func.isRequired,
};

export default Timer;
