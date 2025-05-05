import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

// Mock AuthProvider since it's used in App
jest.mock('./Components/SharedComponents/AuthContext', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

test('renders app without crashing', () => {
  render(<App />);
  // Since your app routes to ManiSharedPage by default, you might want to test for something in that component
  // Or just verify the app renders without errors
  expect(screen.getByTestId('app-container')).toBeInTheDocument();
});