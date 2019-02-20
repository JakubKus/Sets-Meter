import React from 'react';
import PropTypes from 'prop-types';
import AnalyticsEvent from '../AnalyticsEvent/AnalyticsEvent';

const AddButton = ({ enableEditor }) => (
  <div className="addSetButton">
    <button
      onClick={() => {
        enableEditor();
        AnalyticsEvent({ name: 'App', value: 'Clicked AddButton' });
      }}
    >
      <img src="add.svg" alt="add" />
    </button>
  </div>
);

AddButton.propTypes = {
  enableEditor: PropTypes.func.isRequired,
};

export default AddButton;
