import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../components/App/App';

afterEach(cleanup);
jest.mock("react-ga");

test('adds 1 minute and 14 seconds', () => {
  const { container } = render(<App />);
  const addMinute = container.querySelectorAll('.time .mins img')[0];
  const addTenSeconds = container.querySelectorAll('.time .tenSecs img')[0];
  const addSecond = container.querySelectorAll('.time .secs img')[0];

  fireEvent.click(addMinute);
  fireEvent.click(addTenSeconds);
  fireEvent.click(addSecond);
  fireEvent.click(addSecond);
  fireEvent.click(addSecond);
  fireEvent.click(addSecond);

  expect(container.querySelector('.time .mins').innerHTML).toContain(3);
  expect(container.querySelector('.time .tenSecs').innerHTML).toContain(1);
  expect(container.querySelector('.time .secs').innerHTML).toContain(4);
});

test('subtracts 1 minute and 21 seconds', () => {
  const { container } = render(<App />);
  const subtractMinute = container.querySelectorAll('.time .mins img')[1];
  const subtractTenSeconds = container.querySelectorAll('.time .tenSecs img')[1];
  const subtractSecond = container.querySelectorAll('.time .secs img')[1];

  fireEvent.click(subtractMinute);
  fireEvent.click(subtractTenSeconds);
  fireEvent.click(subtractTenSeconds);
  fireEvent.click(subtractSecond);

  expect(container.querySelector('.time .mins').innerHTML).toContain(0);
  expect(container.querySelector('.time .tenSecs').innerHTML).toContain(3);
  expect(container.querySelector('.time .secs').innerHTML).toContain(9);
});
