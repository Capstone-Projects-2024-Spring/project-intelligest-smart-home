import { render, screen } from '@testing-library/react';
import Home from '.../src/page';
import React from 'react';
import { render, screen, within, fireEvent} from '@testing-library/react'
import Home from './page';
import handleClick from './page';

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
