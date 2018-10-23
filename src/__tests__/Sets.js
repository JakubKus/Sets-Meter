import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../App';

afterEach(cleanup);

test('inserts `exercise` with Next button, with default setsNumber and generates it properly', () => {
  const { container, getByPlaceholderText, getByText } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const nextButton = getByText('Next');

  fireEvent.change(setEditorInput, { target: { value: 'exercise' } });
  fireEvent.click(nextButton);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(1);
  expect(container.querySelector('.sets .set .exerciseName').innerHTML).toBe('exercise');
  expect(container.querySelector('.sets .set .setsMeter span.currentSet').innerHTML).toBe('1');
  expect(container.querySelector('.sets .set .setsMeter span:last-child').innerHTML).toBe('/1');
});

test('inserts `another exercise` with Done button, with setsNumber = 3 and generates it properly', () => {
  const {
    container,
    getByPlaceholderText,
    queryAllByText,
    getByText,
  } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const doneButton = queryAllByText('Done')[0];
  const button3 = getByText('3');

  fireEvent.change(setEditorInput, { target: { value: 'another exercise' } });
  fireEvent.click(button3);
  fireEvent.click(doneButton);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(1);
  expect(container.querySelector('.sets .set .exerciseName').innerHTML).toBe('another exercise');
  expect(container.querySelector('.sets .set .setsMeter span.currentSet').innerHTML).toBe('1');
  expect(container.querySelector('.sets .set .setsMeter span:last-child').innerHTML).toBe('/3');
});

test('modifies added set and saves it', () => {
  const {
    container,
    getByPlaceholderText,
    queryAllByText,
    getByAltText,
    getByText,
  } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const doneButton = queryAllByText('Done')[0];
  fireEvent.change(setEditorInput, { target: { value: 'exercise' } });
  fireEvent.click(doneButton);
  const editSet = getByAltText('edit');
  fireEvent.click(editSet);
  const button6 = getByText('6');
  const doneEditButton = queryAllByText('Done')[1];

  fireEvent.change(setEditorInput, { target: { value: 'modified exercise' } });
  fireEvent.click(button6);
  fireEvent.click(doneEditButton);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(1);
  expect(container.querySelector('.sets .set .exerciseName').innerHTML).toBe('modified exercise');
  expect(container.querySelector('.sets .set .setsMeter span.currentSet').innerHTML).toBe('1');
  expect(container.querySelector('.sets .set .setsMeter span:last-child').innerHTML).toBe('/6');
});

test('deletes set', () => {
  const {
    container,
    getByPlaceholderText,
    queryAllByText,
    getByAltText,
  } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const doneButton = queryAllByText('Done')[0];
  fireEvent.change(setEditorInput, { target: { value: 'exercise' } });
  fireEvent.click(doneButton);
  const deleteSet = getByAltText('done');

  fireEvent.click(deleteSet);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(0);
});

test('increases current set number', () => {
  const {
    container,
    getByPlaceholderText,
    queryAllByText,
    getByText,
    getByAltText,
  } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const doneButton = queryAllByText('Done')[0];
  const button4 = getByText('4');
  fireEvent.change(setEditorInput, { target: { value: 'exercise' } });
  fireEvent.click(button4);
  fireEvent.click(doneButton);
  const addSet = getByAltText('add');

  fireEvent.click(addSet);
  fireEvent.click(addSet);

  expect(container.querySelector('.sets .set .setsMeter span.currentSet').innerHTML).toBe('3');
  expect(container.querySelector('.sets .set .setsMeter span:last-child').innerHTML).toBe('/4');
});

test('decreases current set number', () => {
  const {
    container,
    getByPlaceholderText,
    queryAllByText,
    getByText,
    getByAltText,
  } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const doneButton = queryAllByText('Done')[0];
  const button4 = getByText('4');
  fireEvent.change(setEditorInput, { target: { value: 'exercise' } });
  fireEvent.click(button4);
  fireEvent.click(doneButton);
  const addSet = getByAltText('add');
  const subtractSet = getByAltText('subtract');

  fireEvent.click(addSet);
  fireEvent.click(addSet);
  fireEvent.click(subtractSet);

  expect(container.querySelector('.sets .set .setsMeter span.currentSet').innerHTML).toBe('2');
  expect(container.querySelector('.sets .set .setsMeter span:last-child').innerHTML).toBe('/4');
});
