import React from 'react';
import { render } from '@testing-library/react';
import Signup from './signup';

describe('Signup', () => {

  it('renders without crashing', () => {
    render(<Signup />);
  });

  it('contains an input for username', () => {
    const { getByPlaceholderText } = render(<Signup />);
    expect(getByPlaceholderText('Create your username')).toBeInTheDocument();
  });

  it('contains an input for email', () => {
    const { getByPlaceholderText } = render(<Signup />);
    expect(getByPlaceholderText('Enter a valid email')).toBeInTheDocument();
  });

  it('contains an input for password', () => {
    const { getByPlaceholderText } = render(<Signup />);
    expect(getByPlaceholderText('Create your password')).toBeInTheDocument();
  });
});
