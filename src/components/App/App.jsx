import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Header from '../Header/Header';
import Settings from '../Settings/Settings';
import Editor from '../Editor/Editor';
import Sets from '../Sets/Sets';
import AddButton from '../AddButton/AddButton';
import '../../index.scss';

const App = ({ cookies }) => {
  let editorInput = null;

  const editorInputRef = (ref) => {
    editorInput = ref;
  };

  const setCookie = (cookie) => {
    const hundredDaysInSeconds = 100 * 24 * 60 * 60;

    cookies.set(
      cookie.name,
      cookie.value,
      { maxAge: hundredDaysInSeconds },
    );
  };

  const [setsList, updateSetsList] = useState(cookies.get('setsList') || []);

  const [settingsActive, toggleSettings] = useState(false);
  const enableSettings = () => toggleSettings(true);
  const disableSettings = () => toggleSettings(false);

  const resetSetsList = () => updateSetsList([]);

  const [manualActive, toggleManual] = useState(cookies.get('manualNotSeen') || true);
  const enableManual = () => toggleManual(true);
  const disableManual = () => toggleManual(false);

  const [enteredExercise, enterExercise] = useState('');
  const [enteredSetsNo, enterSetsNo] = useState(1);

  useEffect(() => {
    setCookie({
      name: 'setsList',
      value: setsList,
    });
  }, [setsList]);

  const [editorActive, toggleEditor] = useState(true);
  const enableEditor = () => toggleEditor(true);
  const disableEditor = () => toggleEditor(false);

  const [editMode, toggleEditMode] = useState(false);
  const enableEditMode = () => toggleEditMode(true);
  const disableEditMode = () => toggleEditMode(false);

  const [editIndex, updateEditIndex] = useState(-1);

  const handleEscKey = (e) => {
    if (e && e.keyCode === 27) {
      if (manualActive)
        disableManual();
      else if (editorActive) {
        disableEditor();
        disableEditMode();
      }
    }
  };

  useEffect(() => {
    editorInput.focus();
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  });

  return (
    <main>
      <Header
        settingsActive={settingsActive}
        enableSettings={enableSettings}
        disableSettings={disableSettings}
        resetSets={resetSetsList}
        manualActive={manualActive}
        enableManual={enableManual}
        disableManual={disableManual}
      />
      <Settings
        settingsActive={settingsActive}
        setsList={setsList}
        cookies={cookies}
        setCookie={setCookie}
      />
      <Editor
        editorInputRef={editorInputRef}
        editorActive={editorActive}
        editMode={editMode}
        disableEditMode={disableEditMode}
        editIndex={editIndex}
        setsList={setsList}
        updateSetsList={updateSetsList}
        enteredExercise={enteredExercise}
        enterExercise={enterExercise}
        enteredSetsNo={enteredSetsNo}
        enterSetsNo={enterSetsNo}
        disableEditor={disableEditor}
      />
      <Sets
        setsList={setsList}
        updateSetsList={updateSetsList}
        enableEditor={enableEditor}
        enableEditMode={enableEditMode}
        updateEditIndex={updateEditIndex}
        enterExercise={enterExercise}
        enterSetsNo={enterSetsNo}
      />
      <AddButton enableEditor={enableEditor} />
    </main>
  );
};

App.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(App);
