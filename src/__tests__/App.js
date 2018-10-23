import React from 'react';
import { render, cleanup } from 'react-testing-library';
import App from '../App';

afterEach(cleanup);

test('renders without errors', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
