import React from 'react';
import { render } from '@testing-library/react';
import Profile from './profile';

describe('Profile', () => {

  it('renders without crashing', () => {
    render(<Profile />);
  });

  it('contains the username input', () => {
    const { getByPlaceholderText } = render(<Profile />);
    const usernameInput = getByPlaceholderText(' Edit Username (Optional)');
    expect(usernameInput).toBeInTheDocument();
  });
});
