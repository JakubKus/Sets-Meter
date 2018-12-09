import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../components/App/App';

afterEach(cleanup);
jest.mock("react-ga");

test('inserts `exercise` with Next button, with default setsNumber and generates it properly', () => {
  const { container, getByPlaceholderText, getByText } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const nextButton = getByText('Next');

  fireEvent.change(setEditorInput, { target: { value: 'exercise' } });
  fireEvent.click(nextButton);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(1);
  expect(container.querySelector('.sets .set .exerciseName').innerHTML).toBe('exercise');
  expect(container.querySelectorAll('.sets .set .setsLeft .decrease.invisible')).toHaveLength(1);
  expect(container.querySelector('.sets .set .setsLeft span.num').innerHTML).toBe('1');
  expect(container.querySelector('.sets .set .setsLeft span:last-child').innerHTML).toBe('Left');
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
  expect(container.querySelector('.sets .set .setsLeft span.num').innerHTML).toBe('3');
  expect(container.querySelector('.sets .set .setsLeft span:last-child').innerHTML).toBe('Left');
});

test('decreases left sets number', () => {
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
  const subtractSet = getByAltText('arrow down');

  fireEvent.click(subtractSet);
  fireEvent.click(subtractSet);

  expect(container.querySelector('.sets .set .setsLeft span.num').innerHTML).toBe('2');
  expect(container.querySelector('.sets .set .setsLeft span:last-child').innerHTML).toBe('Left');
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
  expect(container.querySelector('.sets .set .setsLeft span.num').innerHTML).toBe('6');
  expect(container.querySelector('.sets .set .setsLeft span:last-child').innerHTML).toBe('Left');
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
  const deleteSet = getByAltText('delete');

  fireEvent.click(deleteSet);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(0);
});
