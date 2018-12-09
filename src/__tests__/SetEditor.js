import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../components/App/App';

afterEach(cleanup);
jest.mock("react-ga");

test('SetEditor is open from the beginning', () => {
  const { container } = render(<App />);

  expect(container.querySelector('.setEditor').className).toBe('setEditor on');
});

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

test('hides setEditor with x button', () => {
  const { getByAltText, container} = render(<App />);
  const closeButton = getByAltText('close');

  fireEvent.click(closeButton);

  expect(container.querySelector('.setEditor').className).toBe('setEditor off');
});

test('hides setEditor with "esc" key', () => {
  const { container} = render(<App />);
  const onKeyDown = jest.fn();
  const escInput = render(<input onKeyDown={onKeyDown} />).container;
  const escKey = escInput.getElementsByTagName('input')[0];

  fireEvent.keyDown(escKey, { key: 'esc', keyCode: 27 });

  expect(container.querySelector('.setEditor').className).toBe('setEditor off');
});
