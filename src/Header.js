import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import Settings from './Settings';

const Header = ({
  notifyStatus,
  startNotifyTimer,
  stopNotifyTimer,
}) => (
  <header>
    <div className="container">
      <Timer />
      <Settings
        notifyStatus={notifyStatus}
        startNotifyTimer={startNotifyTimer}
        stopNotifyTimer={stopNotifyTimer}
      />
    </div>
  </header>
);

Header.propTypes = {
  notifyStatus: PropTypes.bool.isRequired,
  startNotifyTimer: PropTypes.func.isRequired,
  stopNotifyTimer: PropTypes.func.isRequired,
};

export default Header;
