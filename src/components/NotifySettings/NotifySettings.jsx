import React from 'react';
import PropTypes from 'prop-types';

const NotifySettings = ({
  showNotifySettings,
  notifyMode,
  changeNotifyMode,
  showNotifyInstr,
  toggleNotifyInstr,
  notifyStatus,
  startNotifyTimer,
  stopNotifyTimer,
  gaEvent,
}) => {
  const notifySettings = showNotifySettings
    ? 'notifySettings'
    : 'notifySettings off';

  return (
    <>
      <div className={notifySettings}>
        <img
          src="./info.svg"
          onClick={() => {
            toggleNotifyInstr();
            gaEvent('NotifySettings', 'Clicked on the info icon');
          }}
          className="info"
          alt="info"
        />
        <div className="settings">
          <div className="mode">
            <img src="./barbells.svg" alt="barbells" />
            <button
              onClick={() => {
                gaEvent('NotifySettings', 'Switched notify mode to sw');
                changeNotifyMode('sw');
              }}
              className={notifyMode === 'sw' ? 'sw checked' : 'sw'}
            >
              {'Sw'}
            </button>
            <button
              onClick={() => {
                gaEvent('NotifySettings', 'Switched notify mode to gym');
                changeNotifyMode('gym');
              }}
              className={notifyMode === 'gym' ? 'gym checked' : 'gym'}
            >
              {'Gym'}
            </button>
          </div>
          <div className="notifyTimer">
            <img src="./clock-start.svg" alt="clock start" />
            <button
              onClick={() => {
                gaEvent('NotifySettings', 'Started notify timer');
                startNotifyTimer();
              }}
              className={notifyStatus ? 'on checked' : 'on'}
            >
              {'On'}
            </button>
            <button
              onClick={() => {
                gaEvent('NotifySettings', 'Stopped notify timer');
                stopNotifyTimer();
              }}
              className={notifyStatus ? 'off' : 'off checked'}
            >
              {'Off'}
            </button>
          </div>
        </div>
      </div>
      <article
        onClick={() => {
          gaEvent('NotifySettings', 'Closed instructions by clicking on them');
          toggleNotifyInstr();
        }}
        className={showNotifyInstr && showNotifySettings ? 'instr' : 'instr off'}
      >
        {'Select training mode to change order of notifications'}
        <ul>
          <li>Sw: exercise after exercise in the circuit</li>
          <li>Gym: set after set, exercise after exercise</li>
        </ul>
        <hr />
        {'Select \'On\' to receive a notification when the break ends or'
        + ' \'Off\' to stop them'}
      </article>
    </>
  );
};

NotifySettings.propTypes = {
  showNotifySettings: PropTypes.bool.isRequired,
  notifyMode: PropTypes.string.isRequired,
  changeNotifyMode: PropTypes.func.isRequired,
  showNotifyInstr: PropTypes.bool.isRequired,
  toggleNotifyInstr: PropTypes.func.isRequired,
  notifyStatus: PropTypes.bool.isRequired,
  startNotifyTimer: PropTypes.func.isRequired,
  stopNotifyTimer: PropTypes.func.isRequired,
  gaEvent: PropTypes.func.isRequired,
};

export default NotifySettings;
