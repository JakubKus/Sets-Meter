import React from 'react';
import PropTypes from 'prop-types';

const Sets = ({
  setsList,
  decreaseSetsNum,
  editSet,
  deleteSet,
}) => (
  <div className="sets">
    {
      setsList.map((set, index) => (
        <div className="set" key={index}>
          <div className="setsLeft">
            <button
              onClick={() => { decreaseSetsNum(index); }}
              className={set.setsNum > 1 ? 'decrease' : 'decrease invisible'}
              disabled={set.setsNum < 2}
            >
              <img src="arrow-down.svg" alt="set down" />
            </button>
            <span className="num">{set.setsNum}</span>
            <span>Left</span>
          </div>
          <span className="exerciseName">{set.exercise}</span>
          <button className="setEdit" onClick={() => { editSet(index); }}>
            <img src="edit.svg" alt="edit" />
          </button>
          <button className="setDone" onClick={() => { deleteSet(index); }}>
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
};

export default Sets;
