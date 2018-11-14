import React from 'react';
import PropTypes from 'prop-types';

const Settings = ({
  notifyMode,
  changeNotifyMode,
  notifyStatus,
  startNotifyTimer,
  stopNotifyTimer,
}) => (
  <div className="settings">
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
  notifyStatus: PropTypes.bool.isRequired,
  startNotifyTimer: PropTypes.func.isRequired,
  stopNotifyTimer: PropTypes.func.isRequired,
};

export default Settings;
