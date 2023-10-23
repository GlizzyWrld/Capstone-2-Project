import React from 'react';
import { render } from '@testing-library/react';
import Saved from './saved';

describe('Saved', () => {

  it('renders without crashing', () => {
    render(<Saved />);
  });

  it('contains the text "Saved Facts"', () => {
    const { getByText } = render(<Saved />);
    expect(getByText('Saved Facts')).toBeInTheDocument();
  });
});
