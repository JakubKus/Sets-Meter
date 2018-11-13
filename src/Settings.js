import React from 'react';
import PropTypes from 'prop-types';

const Settings = ({
  notifyStatus,
  startNotifyTimer,
  stopNotifyTimer,
}) => (
  <div className="settings">
    <div className="mode">
      <p>Mode</p>
      <button className="checked">SW</button>
      <button>Gym</button>
    </div>
    <div className="bells">
      <button
        onClick={startNotifyTimer}
        className={notifyStatus ? 'checked' : ''}
      >
        <img src="bell-on.svg" alt="swOn" />
      </button>
      <button
        onClick={stopNotifyTimer}
        className={!notifyStatus ? 'checked' : ''}
      >
        <img src="bell-off.svg" alt="swOff" />
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
