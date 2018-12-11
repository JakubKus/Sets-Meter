import React from 'react';
import PropTypes from 'prop-types';

const ArrowDown = ({
  time,
  isTimerRunning,
  addTime,
  gaEvent,
}) => (
  <button
    onClick={() => {
      gaEvent('Timer', `Decreased time by ${time} seconds`);
      addTime(time);
    }}
    className={isTimerRunning ? 'invisible' : ''}
  >
    <img src="arrow-down.svg" alt="arrow down" />
  </button>
);

ArrowDown.propTypes = {
  time: PropTypes.number.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  addTime: PropTypes.func.isRequired,
  gaEvent: PropTypes.func.isRequired,
};

export default ArrowDown;
