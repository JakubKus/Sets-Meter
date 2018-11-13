import React from 'react';
import PropTypes from 'prop-types';

const Sets = ({
  setsList,
  editSet,
  deleteSet,
  decreaseSetsNum,
}) => (
  <div className="sets">
    {
      setsList.map((set, index) => (
        <div className="set" key={index}>
          <div className="setsMeter">
            <button
              onClick={() => { decreaseSetsNum(index); }}
              className={set.setsNum > 1 ? 'decrease' : 'decrease invisible'}
              disabled={set.setsNum < 2}
            >
              <img
                src="arrow-down.svg"
                alt="down"
              />
            </button>
            <div className="setsLeft">
              <span className="num">{set.setsNum}</span>
              <span>left</span>
            </div>
          </div>
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
            onClick={() => { deleteSet(index); }}
          >
            <img
              src="delete.svg"
              alt="delete"
            />
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
};

export default Sets;
