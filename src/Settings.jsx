import React from 'react';
import PropTypes from 'prop-types';

const Settings = ({
  notifyMode,
  changeNotifyMode,
  showNotifyInstr,
  toggleNotifyInstr,
  notifyStatus,
  startNotifyTimer,
  stopNotifyTimer,
}) => (
  <div className="settings">
    <p
      className={showNotifyInstr ? 'instr' : 'instr hidden'}
      onClick={toggleNotifyInstr}
    >
      {'Click the bell to receive a notification when the break ends'}
    </p>
    <div className="mode">
      <p className="title">Mode</p>
      <button
        onClick={() => { changeNotifyMode('sw'); }}
        className={notifyMode === 'sw' ? 'sw checked' : 'sw'}
      >
        {'Sw'}
      </button>
      <button
        onClick={() => { changeNotifyMode('gym'); }}
        className={notifyMode === 'gym' ? 'gym checked' : 'gym'}
      >
        {'Gym'}
      </button>
    </div>
    <div className="notifications">
      <button
        onClick={toggleNotifyInstr}
        className="info"
      >
        <img src="info.svg" alt="info" />
      </button>
      <button
        onClick={startNotifyTimer}
        className={notifyStatus ? 'on checked' : 'on'}
      >
        <img src="notifications-on.svg" alt="notifications on" />
      </button>
      <button
        onClick={stopNotifyTimer}
        className={!notifyStatus ? 'off checked' : 'off'}
      >
        <img src="notifications-off.svg" alt="notifications off" />
      </button>
    </div>
  </div>
);

Settings.propTypes = {
  notifyMode: PropTypes.string.isRequired,
  changeNotifyMode: PropTypes.func.isRequired,
  showNotifyInstr: PropTypes.bool.isRequired,
  toggleNotifyInstr: PropTypes.func.isRequired,
  notifyStatus: PropTypes.bool.isRequired,
  startNotifyTimer: PropTypes.func.isRequired,
  stopNotifyTimer: PropTypes.func.isRequired,
};

export default Settings;
