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
  editMode,
  addSet,
  addEditedSet,
  clearSetEditor,
  focusSetEditor,
  hideSetEditor,
}) => {
  const editHide = editMode ? 'hidden' : '';
  const editShow = editMode ? '' : 'hidden';
  const numberButtons = [3, 6, 9];

  return (
    <figure className={showSetEditor ? 'setEditor' : 'hidden'}>
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
            value={enteredExercise}
            ref={setEditorRef}
            placeholder="Enter exercise"
            type="text"
            autoFocus
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addSet();
              clearSetEditor();
              focusSetEditor();
            }}
            className={editHide}
            disabled={!!editHide}
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
            className={editHide}
            disabled={!!editHide}
          >
            {'Done'}
          </button>
          <button
            onClick={() => {
              addEditedSet();
              clearSetEditor();
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
        {numberButtons.filter(nums => (nums % 3 === 0)).map(num => (
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
        ))}
      </div>
    </figure>
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
  editMode: PropTypes.bool.isRequired,
  addSet: PropTypes.func.isRequired,
  addEditedSet: PropTypes.func.isRequired,
  clearSetEditor: PropTypes.func.isRequired,
  focusSetEditor: PropTypes.func.isRequired,
  hideSetEditor: PropTypes.func.isRequired,
};

export default SetEditor;
