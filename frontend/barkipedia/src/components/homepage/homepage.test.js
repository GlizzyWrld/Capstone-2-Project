import React from 'react';
import { render } from '@testing-library/react';
import Homepage from './homepage';

describe('Homepage', () => {

  it('renders without crashing', () => {
    render(<Homepage />);
  });

  it('matches its snapshot', () => {
    const { asFragment } = render(<Homepage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('has the text "Welcome to Barkipedia" on the page', () => {
    const { getByText } = render(<Homepage />);
    expect(getByText('Welcome to Barkipedia')).toBeInTheDocument();
  });
});
