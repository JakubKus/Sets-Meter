import React from 'react';
import PropTypes from 'prop-types';

const Set = ({
  set,
  index,
  decreaseSetsNum,
  editSet,
  deleteSet,
  gaEvent,
}) => (
  <div className="set">
    <div className="setsLeft">
      <button
        onClick={() => {
          gaEvent('Sets', 'Decreased sets number');
          decreaseSetsNum(index);
        }}
        className={set.setsNum < 2 ? 'decrease invisible' : 'decrease'}
        disabled={set.setsNum < 2}
      >
        <img src="arrow-down.svg" alt="arrow down" />
      </button>
      <span className="num">{set.setsNum}</span>
      <span>Left</span>
    </div>
    <span className="exerciseName">{set.exercise}</span>
    <button
      onClick={() => {
        gaEvent('Sets', 'Clicked edit button');
        editSet(index);
      }}
      className="edit"
    >
      <img src="edit.svg" alt="edit" />
    </button>
    <button
      onClick={() => {
        gaEvent('Sets', 'Clicked delete button');
        deleteSet(index);
      }}
      className="delete"
    >
      <img src="delete.svg" alt="delete" />
    </button>
  </div>
);

Set.propTypes = {
  set: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  decreaseSetsNum: PropTypes.func.isRequired,
  editSet: PropTypes.func.isRequired,
  deleteSet: PropTypes.func.isRequired,
  gaEvent: PropTypes.func.isRequired,
};

export default Set;
