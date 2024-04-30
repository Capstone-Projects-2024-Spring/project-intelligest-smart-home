import { render, screen } from '@testing-library/react';
import App from './App';
import sum from './App';

//const sum = require('./sum');

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for TV button', () => {
  render(<App/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("TV");
});
