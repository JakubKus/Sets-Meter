import React from 'react';
import PropTypes from 'prop-types';
import ArrowUp from '../ArrowUp/ArrowUp';
import ArrowDown from '../ArrowDown/ArrowDown';

const Timer = ({
  showTimerButtons,
  showNotifySettings,
  currentBreakTime,
  isTimerRunning,
  addTime,
  gaEvent,
}) => {
  const timer = showTimerButtons || showNotifySettings ? 'timer' : 'timer off';
  const breakMins = Math.floor(currentBreakTime / 60);
  const breakTenSecs = Math.floor((currentBreakTime - (breakMins * 60)) / 10);
  const breakSecs = currentBreakTime - (breakMins * 60) - (breakTenSecs * 10);

  return (
    <div className={timer}>
      <span className="mins">
        <ArrowUp
          addTime={addTime}
          isTimerRunning={isTimerRunning}
          time={60}
          gaEvent={gaEvent}
        />
        {breakMins}
        <ArrowDown
          addTime={addTime}
          isTimerRunning={isTimerRunning}
          time={-60}
          gaEvent={gaEvent}
        />
      </span>
      <span>:</span>
      <span className="tenSecs">
        <ArrowUp
          addTime={addTime}
          isTimerRunning={isTimerRunning}
          time={10}
          gaEvent={gaEvent}
        />
        {breakTenSecs}
        <ArrowDown
          addTime={addTime}
          isTimerRunning={isTimerRunning}
          time={-10}
          gaEvent={gaEvent}
        />
      </span>
      <span className="secs">
        <ArrowUp
          addTime={addTime}
          isTimerRunning={isTimerRunning}
          time={1}
          gaEvent={gaEvent}
        />
        {breakSecs}
        <ArrowDown
          addTime={addTime}
          isTimerRunning={isTimerRunning}
          time={-1}
          gaEvent={gaEvent}
        />
      </span>
    </div>
  );
};

Timer.propTypes = {
  showTimerButtons: PropTypes.bool.isRequired,
  showNotifySettings: PropTypes.bool.isRequired,
  currentBreakTime: PropTypes.number.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  addTime: PropTypes.func.isRequired,
  gaEvent: PropTypes.func.isRequired,
};

export default Timer;
