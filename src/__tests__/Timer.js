import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../components/App/App';

afterEach(cleanup);
jest.mock("react-ga");

test('adds 1 minute and 14 seconds', () => {
  const { container } = render(<App />);
  const addMinute = container.querySelectorAll('.timer .mins img')[0];
  const addTenSeconds = container.querySelectorAll('.timer .tenSecs img')[0];
  const addSecond = container.querySelectorAll('.timer .secs img')[0];

  fireEvent.click(addMinute);
  fireEvent.click(addTenSeconds);
  fireEvent.click(addSecond);
  fireEvent.click(addSecond);
  fireEvent.click(addSecond);
  fireEvent.click(addSecond);

  expect(container.querySelector('.timer .mins').innerHTML).toContain(3);
  expect(container.querySelector('.timer .tenSecs').innerHTML).toContain(1);
  expect(container.querySelector('.timer .secs').innerHTML).toContain(4);
});

test('subtracts 1 minute and 21 seconds', () => {
  const { container } = render(<App />);
  const subtractMinute = container.querySelectorAll('.timer .mins img')[1];
  const subtractTenSeconds = container.querySelectorAll('.timer .tenSecs img')[1];
  const subtractSecond = container.querySelectorAll('.timer .secs img')[1];

  fireEvent.click(subtractMinute);
  fireEvent.click(subtractTenSeconds);
  fireEvent.click(subtractTenSeconds);
  fireEvent.click(subtractSecond);

  expect(container.querySelector('.timer .mins').innerHTML).toContain(1);
  expect(container.querySelector('.timer .tenSecs').innerHTML).toContain(5);
  expect(container.querySelector('.timer .secs').innerHTML).toContain(3);
});
