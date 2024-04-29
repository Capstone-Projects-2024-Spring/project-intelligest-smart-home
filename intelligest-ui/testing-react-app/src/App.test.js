import { render, screen } from '@testing-library/react';
import App from './App';

test('Test for Video Feed', () => {
  render(<App />);
  const linkElement = screen.getByText(/Video Feed/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for Home Assistant Icon', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home Assistant Icon/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for TV Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/TV Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for Light Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Light Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for Alarm Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Alarm Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for Weather Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for Thermostat Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Thermostat Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for Locks Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Locks Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for Reminders Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Reminders Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test for To-do List Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/To-do List Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});


