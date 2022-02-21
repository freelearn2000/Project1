import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/lear react/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders react logo', () => {
  render(<App />);
  const imgElement = screen.getByAltText(/logo/i);
  expect(imgElement).toBeInTheDocument();
});

