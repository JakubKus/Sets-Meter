import React from 'react';
import PropTypes from 'prop-types';
import Set from '../Set/Set';

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
        <Set
          key={index}
          set={set}
          index={index}
          decreaseSetsNum={decreaseSetsNum}
          editSet={editSet}
          deleteSet={deleteSet}
          gaEvent={gaEvent}
        />
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
