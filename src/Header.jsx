import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import Settings from './Settings';

const Header = ({
  currentBreakTime,
  isTimerRunning,
  timerStart,
  timerPause,
  timerStop,
  addTime,
  notifyMode,
  changeNotifyMode,
  showNotifyInstr,
  toggleNotifyInstr,
  notifyStatus,
  startNotifyTimer,
  stopNotifyTimer,
}) => (
  <header>
    <div className="container">
      <Timer
        currentBreakTime={currentBreakTime}
        isTimerRunning={isTimerRunning}
        timerStart={timerStart}
        timerPause={timerPause}
        timerStop={timerStop}
        addTime={addTime}
        notifyStatus={notifyStatus}
      />
      <Settings
        notifyMode={notifyMode}
        changeNotifyMode={changeNotifyMode}
        showNotifyInstr={showNotifyInstr}
        toggleNotifyInstr={toggleNotifyInstr}
        notifyStatus={notifyStatus}
        startNotifyTimer={startNotifyTimer}
        stopNotifyTimer={stopNotifyTimer}
      />
    </div>
  </header>
);

Header.propTypes = {
  currentBreakTime: PropTypes.number.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  timerStart: PropTypes.func.isRequired,
  timerPause: PropTypes.func.isRequired,
  timerStop: PropTypes.func.isRequired,
  addTime: PropTypes.func.isRequired,
  notifyMode: PropTypes.string.isRequired,
  changeNotifyMode: PropTypes.func.isRequired,
  showNotifyInstr: PropTypes.bool.isRequired,
  toggleNotifyInstr: PropTypes.func.isRequired,
  notifyStatus: PropTypes.bool.isRequired,
  startNotifyTimer: PropTypes.func.isRequired,
  stopNotifyTimer: PropTypes.func.isRequired,
};

export default Header;
