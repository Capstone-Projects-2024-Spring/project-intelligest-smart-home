import React from 'react';
import {
    screen,
    waitForElementToBeRemoved,
    within,
  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './page';
import { render, fireEvent } from '../test-utils';


test('Button click logs the correct button name', () => {

  const consoleSpy = jest.spyOn(console, 'log'); // Spy on console.log
  const { getByText } = render(<Home />);

  // Simulate a click on the button
  fireEvent.click(getByText('TV'));

  // Expect console.log to be called with the correct button name
  expect(consoleSpy).toHaveBeenCalledWith('TV Button Pressed');
});




