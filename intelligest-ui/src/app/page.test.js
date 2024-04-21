import React from 'react';
import { render, screen, within, fireEvent} from '@testing-library/react'
import Home from './page';
import handleClick from './page';
//import '@testing-library/jest-dom'



/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */


test('Button click logs the correct button name', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("TV");
});




