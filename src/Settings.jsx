import React from 'react';
import PropTypes from 'prop-types';

const Settings = ({
  notifyStatus,
  startNotifyTimer,
  stopNotifyTimer,
}) => (
  <div className="settings">
    <div className="mode">
      <p className="title">Mode</p>
      <button className="sw checked">SW</button>
      <button className="gym">Gym</button>
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
  notifyStatus: PropTypes.bool.isRequired,
  startNotifyTimer: PropTypes.func.isRequired,
  stopNotifyTimer: PropTypes.func.isRequired,
};

export default Settings;
