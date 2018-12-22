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
});

test('inserts `another exercise` with Done button, with setsNumber = 4 and generates it properly', () => {
  const {
    container,
    getByPlaceholderText,
    queryAllByText,
    getByText,
  } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const doneButton = queryAllByText('Done')[0];
  const button4 = getByText('4');

  fireEvent.change(setEditorInput, { target: { value: 'another exercise' } });
  fireEvent.click(button4);
  fireEvent.click(doneButton);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(2);
  expect(container.querySelectorAll('.sets .set .exerciseName')[1].innerHTML).toBe('another exercise');
  expect(container.querySelectorAll('.sets .set .setsLeft span.num')[1].innerHTML).toBe('4');
});

test('decreases left sets number', () => {
  const { container } = render(<App />);
  const subtractSet = container.querySelectorAll('.sets .set .setsLeft .decrease img')[1];

  fireEvent.click(subtractSet);
  fireEvent.click(subtractSet);

  expect(container.querySelectorAll('.sets .set .setsLeft span.num')[1].innerHTML).toBe('2');
});

test('modifies added set and saves it', () => {
  const {
    container,
    getByPlaceholderText,
    queryAllByText,
    queryAllByAltText,
    getByText,
  } = render(<App />);
  const editSet = queryAllByAltText('edit')[1];
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const button6 = getByText('6');
  const doneEditButton = queryAllByText('Done')[1];

  fireEvent.click(editSet);
  fireEvent.change(setEditorInput, { target: { value: 'modified exercise' } });
  fireEvent.click(button6);
  fireEvent.click(doneEditButton);

  expect(container.querySelectorAll('.sets .set .exerciseName')[1].innerHTML).toBe('modified exercise');
  expect(container.querySelectorAll('.sets .set .setsLeft span.num')[1].innerHTML).toBe('6');
});

test('deletes set', () => {
  const { container, queryAllByAltText } = render(<App />);
  const deleteSet = queryAllByAltText('delete')[1];

  fireEvent.click(deleteSet);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(1);
});
