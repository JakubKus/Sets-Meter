import React from 'react';
import PropTypes from 'prop-types';

const ArrowUp = ({
  time,
  isTimerRunning,
  addTime,
  gaEvent,
}) => (
  <button
    onClick={() => {
      gaEvent('Timer', `Increased time by ${time} seconds`);
      addTime(time);
    }}
    className={isTimerRunning ? 'invisible' : ''}
  >
    <img src="arrow-up.svg" alt="arrow up" />
  </button>
);

ArrowUp.propTypes = {
  time: PropTypes.number.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  addTime: PropTypes.func.isRequired,
  gaEvent: PropTypes.func.isRequired,
};

export default ArrowUp;
