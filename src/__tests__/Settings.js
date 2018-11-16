import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../App';

afterEach(cleanup);
jest.mock("react-ga");

test('switches to gym mode', () => {
  const { getByText, container } = render(<App />);
  const gymButton = getByText('Gym');

  fireEvent.click(gymButton);

  expect(container.querySelector('.settings .mode .sw').className).toBe('sw');
  expect(container.querySelector('.settings .mode .gym').className).toBe('gym checked');
});

test('switches back to sw mode', () => {
  const { getByText, container } = render(<App />);
  const swButton = getByText('Sw');
  const gymButton = getByText('Gym');

  fireEvent.click(gymButton);
  fireEvent.click(swButton);

  expect(container.querySelector('.settings .mode .sw').className).toBe('sw checked');
  expect(container.querySelector('.settings .mode .gym').className).toBe('gym');
});

test('opens instructions text box by clicking on the info button', () => {
  const { getByAltText, container } = render(<App />);
  const infoButton = getByAltText('info');

  fireEvent.click(infoButton);

  expect(container.querySelector('.settings .instr').className).toBe('instr');
});

test('closes instructions text box by clicking on the info button', () => {
  const { getByAltText, container } = render(<App />);
  const infoButton = getByAltText('info');

  fireEvent.click(infoButton);
  fireEvent.click(infoButton);

  expect(container.querySelector('.settings .instr').className).toBe('instr hidden');
});

test('closes instructions text box by clicking on the instructions text box', () => {
  const { getByAltText, container } = render(<App />);
  const infoButton = getByAltText('info');
  const instructionsTextBox = container.querySelector('.settings .instr');

  fireEvent.click(infoButton);
  fireEvent.click(instructionsTextBox);

  expect(container.querySelector('.settings .instr').className).toBe('instr hidden');
});

test('closes instructions text box with "esc" key', () => {
  const { getByAltText, container } = render(<App />);
  const infoButton = getByAltText('info');
  const onKeyDown = jest.fn();
  const escInput = render(<input onKeyDown={onKeyDown} />).container;
  const escKey = escInput.getElementsByTagName('input')[0];

  fireEvent.click(infoButton);
  fireEvent.keyDown(escKey, { key: 'esc', keyCode: 27 });

  expect(container.querySelector('.settings .instr').className).toBe('instr hidden');
});

test('turns notify timer on and hides timer', () => {
  const { getByAltText, container } = render(<App />);
  const notifyOn = getByAltText('notifications on');

  fireEvent.click(notifyOn);

  expect(container.querySelector('.settings .notifications .on').className).toBe('on checked');
  expect(container.querySelector('.settings .notifications .off').className).toBe('off');
  expect(container.querySelector('.timer').className).toBe('timer hidden');
});

test('turns notify timer off and shows timer back', () => {
  const { getByAltText, container } = render(<App />);
  const notifyOn = getByAltText('notifications on');
  const notifyOff = getByAltText('notifications off');

  fireEvent.click(notifyOn);
  fireEvent.click(notifyOff);

  expect(container.querySelector('.settings .notifications .on').className).toBe('on');
  expect(container.querySelector('.settings .notifications .off').className).toBe('off checked');
  expect(container.querySelector('.timer').className).toBe('timer');
});
