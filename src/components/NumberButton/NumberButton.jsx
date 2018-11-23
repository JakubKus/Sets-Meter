import React from 'react';
import PropTypes from 'prop-types';

const NumberButton = ({ enteredSetsNum, id, enterSetsNum }) => {
  const checked = enteredSetsNum.toString() === id.toString() ? 'checked' : '';
  return (
    <button
      onClick={enterSetsNum}
      className={checked}
      value={id}
    >
      {id}
    </button>
  );
};


NumberButton.propTypes = {
  enteredSetsNum: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  id: PropTypes.number.isRequired,
  enterSetsNum: PropTypes.func.isRequired,
};

export default NumberButton;
