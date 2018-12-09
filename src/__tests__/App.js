import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import App from '../components/App/App';

afterEach(cleanup);
jest.mock("react-ga");

test('renders without errors', () => {
  const { container } = render(<App />);

  expect(container).toBeTruthy();
});

test('opens SetEditor by clicking on the addSetButton', () => {
  const { getByAltText, container } = render(<App />);
  const addSetButton = getByAltText('add');

  fireEvent.click(addSetButton);

  expect(container.querySelector('.setEditor').className).toBe('setEditor on');
});
