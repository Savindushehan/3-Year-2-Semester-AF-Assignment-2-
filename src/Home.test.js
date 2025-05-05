import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Components/MainComponents/Home';
import { BrowserRouter } from 'react-router-dom';

// Mock the image import
jest.mock('./Asserts/Images/Saly-1.png', () => 'mock-image');

// Mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Home Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test('renders heading text', () => {
    const heading = screen.getByText(/Explore Detailed Information/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders the image', () => {
    const image = screen.getByAltText(/Illustration/i);
    expect(image).toBeInTheDocument();
  });

  test('renders and clicks the button', () => {
    const button = screen.getByRole('button', { name: /GetStart/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/CountrySharedpage');
  });
});
