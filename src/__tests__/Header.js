import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../components/App/App';

afterEach(cleanup);
jest.mock("react-ga");

test('opens TimerButtons and Timer by clicking on the clock button', () => {
  const { container, getByAltText } = render(<App />);
  const clockButton = getByAltText('clock');

  fireEvent.click(clockButton);

  expect(container.querySelector('.timerButtons').className).toBe('timerButtons');
  expect(container.querySelector('.timer').className).toBe('timer');
});

test('closes TimerButtons and Timer by clicking on the clock button', () => {
  const { container, getByAltText } = render(<App />);
  const clockButton = getByAltText('clock');

  fireEvent.click(clockButton);
  fireEvent.click(clockButton);

  expect(container.querySelector('.timerButtons').className).toBe('timerButtons off');
  expect(container.querySelector('.timer').className).toBe('timer off');
});

test('clears setsList by clicking on the logo', () => {
  const { container, getByPlaceholderText, getByText } = render(<App />);
  const setEditorInput = getByPlaceholderText('Enter exercise');
  const nextButton = getByText('Next');
  const logo = getByText('Sets Meter');

  fireEvent.change(setEditorInput, { target: { value: 'exercise' } });
  fireEvent.click(nextButton);
  fireEvent.change(setEditorInput, { target: { value: 'another exercise' } });
  fireEvent.click(nextButton);
  fireEvent.click(logo);

  expect(container.querySelectorAll('.sets .set')).toHaveLength(0);
});

test('opens Timer and NotifySettings by clicking on the bell button', () => {
  const { container, getByAltText } = render(<App />);
  const bellButton = getByAltText('bell');

  fireEvent.click(bellButton);

  expect(container.querySelector('.timer').className).toBe('timer');
  expect(container.querySelector('.notifySettings').className).toBe('notifySettings');
});

test('closes Timer and NotifySettings by clicking on the bell button', () => {
  const { container, getByAltText } = render(<App />);
  const bellButton = getByAltText('bell');

  fireEvent.click(bellButton);
  fireEvent.click(bellButton);

  expect(container.querySelector('.timer').className).toBe('timer off');
  expect(container.querySelector('.notifySettings').className).toBe('notifySettings off');
});


test('opens TimerButtons, Timer and NotifySettings by clicking on the clock and bell buttons', () => {
  const { container, getByAltText } = render(<App />);
  const clockButton = getByAltText('clock');
  const bellButton = getByAltText('bell');

  fireEvent.click(clockButton);
  fireEvent.click(bellButton);

  expect(container.querySelector('.timerButtons').className).toBe('timerButtons');
  expect(container.querySelector('.timer').className).toBe('timer');
  expect(container.querySelector('.notifySettings').className).toBe('notifySettings');
});
