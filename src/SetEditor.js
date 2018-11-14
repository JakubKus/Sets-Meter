import React from 'react';
import PropTypes from 'prop-types';
import NumberButton from './NumberButton';

const SetEditor = ({
  showSetEditor,
  setEditorRef,
  enterExercise,
  enteredExercise,
  enterSetsNum,
  enteredSetsNum,
  clearSetEditor,
  focusSetEditor,
  addSet,
  editMode,
  addEditedSet,
  hideSetEditor,
}) => {
  const numberButtons = [3, 6, 9];
  return (
    <div className={showSetEditor ? 'setEditor on' : 'setEditor off'}>
      <button
        onClick={hideSetEditor}
        className="close"
      >
        <img src="close.svg" alt="close" />
      </button>
      <form className="inputAndButtons">
        <input
          onChange={enterExercise}
          value={enteredExercise}
          ref={setEditorRef}
          placeholder="Enter exercise"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addSet();
            clearSetEditor();
            focusSetEditor();
          }}
          className={editMode ? 'hidden' : ''}
          disabled={editMode}
        >
          {'Next'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            addSet();
            clearSetEditor();
            hideSetEditor();
          }}
          className={editMode ? 'hidden' : ''}
          disabled={editMode}
        >
          {'Done'}
        </button>
        <button
          onClick={() => {
            addEditedSet();
            clearSetEditor();
            hideSetEditor();
          }}
          className={editMode ? '' : 'hidden'}
          disabled={!editMode}
        >
          {'Done'}
        </button>
      </form>
      <div className="numbers">
        {
          numberButtons.filter(nums => (nums % 3 === 0)).map(num => (
            <div key={num / 3}>
              <NumberButton
                enterSetsNum={enterSetsNum}
                id={num - 2}
                enteredSetsNum={enteredSetsNum}
              />
              <NumberButton
                enterSetsNum={enterSetsNum}
                id={num - 1}
                enteredSetsNum={enteredSetsNum}
              />
              <NumberButton
                enterSetsNum={enterSetsNum}
                id={num}
                enteredSetsNum={enteredSetsNum}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};


SetEditor.propTypes = {
  showSetEditor: PropTypes.bool.isRequired,
  setEditorRef: PropTypes.func.isRequired,
  enterExercise: PropTypes.func.isRequired,
  enteredExercise: PropTypes.string.isRequired,
  enterSetsNum: PropTypes.func.isRequired,
  enteredSetsNum: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  clearSetEditor: PropTypes.func.isRequired,
  focusSetEditor: PropTypes.func.isRequired,
  addSet: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  addEditedSet: PropTypes.func.isRequired,
  hideSetEditor: PropTypes.func.isRequired,
};

export default SetEditor;
