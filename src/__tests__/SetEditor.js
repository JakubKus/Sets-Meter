import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../App';

afterEach(cleanup);

test('inserts `exercise` into the form field', () => {
  const { getByPlaceholderText } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');

  fireEvent.change(setEditorInput, { target: { value: 'exercise' } });

  expect(setEditorInput.value).toBe('exercise');
});


test('selects a setsNumber', () => {
  const { getByText } = render(<App />);
  const button1 = getByText('1');
  const button3 = getByText('3');

  fireEvent.click(button3);

  expect(button1.className).toBe('');
  expect(button3.className).toBe('checked');
});
