import React from 'react';
import PropTypes from 'prop-types';
import NumberButton from './NumberButton';

const SetEditor = ({
  enterExercise,
  enterSetsNum,
  saveSet,
  resetSetEditor,
  saveEditedSet,
  hideSetEditor,
  showSetEditor,
  editMode,
  enteredSetsNum,
}) => {
  const editHide = editMode ? 'hide' : '';
  const editShow = editMode ? '' : 'hide';

  return (
    <figure className={showSetEditor ? 'setEditor' : 'hide'}>
      <button
        onClick={hideSetEditor}
        className="close"
      >
        <img src="close.svg" alt="close" />
      </button>
      <div className="inputAndButtons">
        <form>
          <input
            onChange={enterExercise}
            placeholder="Enter exercise"
            type="text"
            autoFocus
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              saveSet();
              resetSetEditor();
            }}
            className={editHide}
            disabled={!!editHide}
          >
            {'Next'}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              saveSet();
              hideSetEditor();
            }}
            className={editHide}
            disabled={!!editHide}
          >
            {'Done'}
          </button>
          <button
            onClick={() => {
              saveEditedSet();
              hideSetEditor();
            }}
            className={editShow}
            disabled={!!editShow}
          >
            {'Done'}
          </button>
        </form>
      </div>
      <div className="numbers">
        <div>
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="1"
          />
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="2"
          />
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="3"
          />
        </div>
        <div>
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="4"
          />
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="5"
          />
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="6"
          />
        </div>
        <div>
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="7"
          />
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="8"
          />
          <NumberButton
            enterSetsNum={enterSetsNum}
            enteredSetsNum={enteredSetsNum}
            id="9"
          />
        </div>
      </div>
    </figure>
  );
};


SetEditor.propTypes = {
  enterExercise: PropTypes.func.isRequired,
  enterSetsNum: PropTypes.func.isRequired,
  saveSet: PropTypes.func.isRequired,
  resetSetEditor: PropTypes.func.isRequired,
  saveEditedSet: PropTypes.func.isRequired,
  hideSetEditor: PropTypes.func.isRequired,
  showSetEditor: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  enteredSetsNum: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default SetEditor;
