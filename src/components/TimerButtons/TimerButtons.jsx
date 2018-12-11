import React from 'react';
import PropTypes from 'prop-types';

const TimerButtons = ({
  showTimerButtons,
  timerStart,
  timerPause,
  timerStop,
  gaEvent,
}) => (
  <div className={showTimerButtons ? 'timerButtons' : 'timerButtons off'}>
    <button
      onClick={() => {
        gaEvent('TimerButtons', 'Start');
        timerStart();
      }}
      className="start"
    >
      <img src="start.svg" alt="start" />
    </button>
    <button
      onClick={() => {
        gaEvent('TimerButtons', 'Pause');
        timerPause();
      }}
      className="pause"
    >
      <img src="pause.svg" alt="pause" />
    </button>
    <button
      onClick={() => {
        gaEvent('TimerButtons', 'Stop');
        timerStop();
      }}
      className="stop"
    >
      <img src="stop.svg" alt="stop" />
    </button>
  </div>
);

TimerButtons.propTypes = {
  showTimerButtons: PropTypes.bool.isRequired,
  timerStart: PropTypes.func.isRequired,
  timerPause: PropTypes.func.isRequired,
  timerStop: PropTypes.func.isRequired,
  gaEvent: PropTypes.func.isRequired,
};

export default TimerButtons;
