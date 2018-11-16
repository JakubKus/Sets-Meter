import React from 'react';
import PropTypes from 'prop-types';

const Sets = ({
  setsList,
  decreaseSetsNum,
  editSet,
  deleteSet,
  gaEvent,
}) => (
  <div className="sets">
    {
      setsList.map((set, index) => (
        <div className="set" key={index}>
          <div className="setsLeft">
            <button
              onClick={() => {
                gaEvent('Sets', 'Decreased sets number');
                decreaseSetsNum(index);
              }}
              className={set.setsNum > 1 ? 'decrease' : 'decrease invisible'}
              disabled={set.setsNum < 2}
            >
              <img src="arrow-down.svg" alt="set down" />
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
            className="setEdit"
          >
            <img src="edit.svg" alt="edit" />
          </button>
          <button
            onClick={() => {
              gaEvent('Sets', 'Clicked delete button');
              deleteSet(index);
            }}
            className="setDelete"
          >
            <img src="delete.svg" alt="delete" />
          </button>
        </div>
      ))
    }
  </div>
);

Sets.propTypes = {
  setsList: PropTypes.instanceOf(Array).isRequired,
  decreaseSetsNum: PropTypes.func.isRequired,
  editSet: PropTypes.func.isRequired,
  deleteSet: PropTypes.func.isRequired,
  gaEvent: PropTypes.func.isRequired,
};

export default Sets;
