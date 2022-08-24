import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Connected link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Connected/i);
  expect(linkElement).toBeInTheDocument();
});
