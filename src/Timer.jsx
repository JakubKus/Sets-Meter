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
}) => {
  const arrow = isTimerRunning ? 'invisible' : '';
  const breakMins = Math.floor(currentBreakTime / 60);
  const breakTenSecs = Math.floor((currentBreakTime - (breakMins * 60)) / 10);
  const breakSecs = currentBreakTime - (breakMins * 60) - (breakTenSecs * 10);

  return (
    <div className={notifyStatus ? 'timer hidden' : 'timer'}>
      <div className="controlButtons">
        <button
          onClick={timerStart}
          className="start"
        >
          <img
            src="start.svg"
            alt="start"
          />
        </button>
        <button
          onClick={timerPause}
          className="pause"
        >
          <img
            src="pause.svg"
            alt="pause"
          />
        </button>
        <button
          onClick={timerStop}
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
            onClick={() => { addTime(60); }}
            className={arrow}
          >
            <img
              src="arrow-up.svg"
              alt="up"
            />
          </button>
          {breakMins}
          <button
            onClick={() => { addTime(-60); }}
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
            onClick={() => { addTime(10); }}
            className={arrow}
          >
            <img
              src="arrow-up.svg"
              alt="up"
            />
          </button>
          {breakTenSecs}
          <button
            onClick={() => { addTime(-10); }}
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
            onClick={() => { addTime(1); }}
            className={arrow}
          >
            <img
              src="arrow-up.svg"
              alt="up"
            />
          </button>
          {breakSecs}
          <button
            onClick={() => { addTime(-1); }}
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
};


Timer.propTypes = {
  currentBreakTime: PropTypes.number.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  timerStart: PropTypes.func.isRequired,
  timerPause: PropTypes.func.isRequired,
  timerStop: PropTypes.func.isRequired,
  addTime: PropTypes.func.isRequired,
  notifyStatus: PropTypes.bool.isRequired,
};

export default Timer;
