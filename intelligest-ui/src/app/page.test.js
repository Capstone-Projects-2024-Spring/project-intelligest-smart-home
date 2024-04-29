import React from 'react';
import { render, screen, within, fireEvent} from '@testing-library/react'
import Home from './page';
import handleClick from './page';
//import '@testing-library/jest-dom'



/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

test('Test for Video Feed', () => {
  render(<Home/>);
  const homeElement = screen.getByTestId('video-feed');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("videoElement");
});

test('Test for Home Assistant Icon', () => {
  render(<Home/>);
  const homeElement = screen.getByTestId('HA-icon');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("User Profile");
});




test('Test for TV button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("TV");
});


test('Test for TV button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("TV");
});

test('Test for Light button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("Light");
});

test('Test for Alarm button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("Alarm");
});

test('Test for Weather button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("Weather");
});


test('Test for Thermostat button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("Thermostat");
});


test('Test for Locks button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("Locks");
});


test('Test for Reminders button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("Reminders");
});


test('Test for To-do List button', () => {
  render(<Home handleClick={handleClick}/>);
  const homeElement = screen.getByTestId('button-test');
  expect(homeElement).toBeInDocument();
  expect(homeElement).toHaveTextContent("To-do List");
});








