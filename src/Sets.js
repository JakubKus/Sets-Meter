import React from 'react';
import PropTypes from 'prop-types';

const Sets = ({
  setsList,
  addSet,
  subtractSet,
  editSet,
  doneSet,
}) => (
  <div className="sets">
    {
      setsList.map((set, index) => (
        <div className="set" key={index}>
          <button
            onClick={() => { subtractSet(index); }}
            className="subtractSet"
          >
            <img
              src="subtract.svg"
              alt="subtract"
            />
          </button>
          <div className="setsMeter">
            <span className="currentSet">{set.currentSet}</span>
            <span>{`/${set.setsNum}`}</span>
          </div>
          <button
            onClick={() => { addSet(index); }}
            className="addSet"
          >
            <img
              src="add.svg"
              alt="add"
            />
          </button>
          <span className="exerciseName">{set.exercise}</span>
          <button
            onClick={() => { editSet(index); }}
            className="setEdit"
          >
            <img
              src="edit.svg"
              alt="edit"
            />
          </button>
          <button
            className="setDone"
            onClick={() => { doneSet(index); }}
          >
            <img
              src="delete.svg"
              alt="done"
            />
          </button>
        </div>
      ))
    }
  </div>
);

Sets.propTypes = {
  setsList: PropTypes.instanceOf(Array).isRequired,
  addSet: PropTypes.func.isRequired,
  subtractSet: PropTypes.func.isRequired,
  editSet: PropTypes.func.isRequired,
  doneSet: PropTypes.func.isRequired,
};

export default Sets;
