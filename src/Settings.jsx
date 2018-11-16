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
  gaEvent,
}) => (
  <div className="settings">
    <p
      onClick={() => {
        gaEvent('Settings', 'Hidden instructions text box by clicking on them');
        toggleNotifyInstr();
      }}
      className={showNotifyInstr ? 'instr' : 'instr hidden'}
    >
      {'Click the bell to receive a notification when the break ends'}
    </p>
    <div className="mode">
      <p className="title">Mode</p>
      <button
        onClick={() => {
          gaEvent('Settings', 'Switched notify mode to sw');
          changeNotifyMode('sw');
        }}
        className={notifyMode === 'sw' ? 'sw checked' : 'sw'}
      >
        {'Sw'}
      </button>
      <button
        onClick={() => {
          gaEvent('Settings', 'Switched notify mode to gym');
          changeNotifyMode('gym');
        }}
        className={notifyMode === 'gym' ? 'gym checked' : 'gym'}
      >
        {'Gym'}
      </button>
    </div>
    <div className="notifications">
      <button
        onClick={() => {
          gaEvent('Settings', 'Clicked on info button');
          toggleNotifyInstr();
        }}
        className="info"
      >
        <img src="info.svg" alt="info" />
      </button>
      <button
        onClick={() => {
          gaEvent('Settings', 'Started notify timer');
          startNotifyTimer();
        }}
        className={notifyStatus ? 'on checked' : 'on'}
      >
        <img src="notifications-on.svg" alt="notifications on" />
      </button>
      <button
        onClick={() => {
          gaEvent('Settings', 'Stopped notify timer');
          stopNotifyTimer();
        }}
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
  gaEvent: PropTypes.func.isRequired,
};

export default Settings;
