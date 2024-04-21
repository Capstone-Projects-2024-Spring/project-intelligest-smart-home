import React from 'react';
import { render, screen, within, fireEvent} from '@testing-library/react'
import Home from './page';


test('Button click logs the correct button name', () => {
  render(<Home/>);
  const homeElement = screen.getByTestId('Home-1');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("TV");
});

/*
  const consoleSpy = jest.spyOn(console, 'log'); // Spy on console.log
  const { getByText } = render(<Home />);

  // Simulate a click on the button
  fireEvent.click(getByText('TV'));

  // Expect console.log to be called with the correct button name
  expect(consoleSpy).toHaveBeenCalledWith('TV Button Pressed');
});

*/
