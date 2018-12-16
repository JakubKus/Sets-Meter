import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../components/App/App';

afterEach(cleanup);
jest.mock("react-ga");

test('opens instructions by clicking on the info button, previously opening NotifySettings', () => {
  const { container, getByAltText } = render(<App />);
  const bellButton = getByAltText('bell');
  const infoButton = getByAltText('info');

  fireEvent.click(bellButton);
  fireEvent.click(infoButton);

  expect(container.querySelector('.instr').className).toBe('instr');
});

test('closes instructions by clicking on the info button', () => {
  const { container, getByAltText } = render(<App />);
  const bellButton = getByAltText('bell');
  const infoButton = getByAltText('info');

  fireEvent.click(bellButton);
  fireEvent.click(infoButton);
  fireEvent.click(infoButton);

  expect(container.querySelector('.instr').className).toBe('instr off');
});

test('closes instructions by clicking on them', () => {
  const { container, getByAltText } = render(<App />);
  const bellButton = getByAltText('bell');
  const infoButton = getByAltText('info');
  const instructions = container.querySelector('.instr');

  fireEvent.click(bellButton);
  fireEvent.click(infoButton);
  fireEvent.click(instructions);

  expect(container.querySelector('.instr').className).toBe('instr off');
});

test('closes instructions by closing NotifySettings', () => {
  const { container, getByAltText } = render(<App />);
  const bellButton = getByAltText('bell');
  const infoButton = getByAltText('info');

  fireEvent.click(bellButton);
  fireEvent.click(infoButton);
  fireEvent.click(bellButton);

  expect(container.querySelector('.instr').className).toBe('instr off');
});

test('closes instructions with "esc" key', () => {
  const { container, getByAltText } = render(<App />);
  const bellButton = getByAltText('bell');
  const infoButton = getByAltText('info');
  const onKeyDown = jest.fn();
  const escInput = render(<input onKeyDown={onKeyDown} />).container;
  const escKey = escInput.getElementsByTagName('input')[0];

  fireEvent.click(bellButton);
  fireEvent.click(infoButton);
  fireEvent.keyDown(escKey, { key: 'esc', keyCode: 27 });

  expect(container.querySelector('.instr').className).toBe('instr off');
});

test('switches to gym mode', () => {
  const { container, getByText } = render(<App />);
  const gymButton = getByText('Gym');

  fireEvent.click(gymButton);

  expect(container.querySelector('.settings .mode .sw').className).toBe('sw');
  expect(container.querySelector('.settings .mode .gym').className).toBe('gym checked');
});

test('switches back to sw mode', () => {
  const { container, getByText } = render(<App />);
  const swButton = getByText('Sw');
  const gymButton = getByText('Gym');

  fireEvent.click(gymButton);
  fireEvent.click(swButton);

  expect(container.querySelector('.settings .mode .sw').className).toBe('sw checked');
  expect(container.querySelector('.settings .mode .gym').className).toBe('gym');
});

test('turns notify timer on', () => {
  const { container, getByText } = render(<App />);
  const notifyOn = getByText('On');

  fireEvent.click(notifyOn);

  expect(container.querySelector('.settings .notifyTimer .on').className).toBe('on checked');
  expect(container.querySelector('.settings .notifyTimer .off').className).toBe('off');
});

test('turns notify timer off', () => {
  const { container, getByText } = render(<App />);
  const notifyOn = getByText('On');
  const notifyOff = getByText('Off');

  fireEvent.click(notifyOn);
  fireEvent.click(notifyOff);

  expect(container.querySelector('.settings .notifyTimer .on').className).toBe('on');
  expect(container.querySelector('.settings .notifyTimer .off').className).toBe('off checked');
});
