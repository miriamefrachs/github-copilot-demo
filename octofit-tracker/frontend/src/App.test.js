import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navigation menu', () => {
  render(<App />);
  expect(screen.getByText('OctoFit Tracker')).toBeInTheDocument();
  ['Activities', 'Leaderboard', 'Teams', 'Users', 'Workouts'].forEach((label) => {
    expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
  });
});
