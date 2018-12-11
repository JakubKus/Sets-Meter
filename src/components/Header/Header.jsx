import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
  showTimerButtons,
  toggleTimerButtons,
  resetSets,
  showNotifySettings,
  toggleNotifySettings,
}) => (
  <header>
    <img
      className={showTimerButtons ? 'clock active' : 'clock'}
      onClick={toggleTimerButtons}
      src="clock.svg"
      alt="clock"
    />
    <h1 className="pageTitle" onClick={resetSets}>Sets Meter</h1>
    <img
      className={showNotifySettings ? 'bell active' : 'bell'}
      onClick={toggleNotifySettings}
      src="bell.svg"
      alt="bell"
    />
  </header>
);

Header.propTypes = {
  showTimerButtons: PropTypes.bool.isRequired,
  toggleTimerButtons: PropTypes.func.isRequired,
  resetSets: PropTypes.func.isRequired,
  showNotifySettings: PropTypes.bool.isRequired,
  toggleNotifySettings: PropTypes.func.isRequired,
};

export default Header;
