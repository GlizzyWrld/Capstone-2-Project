import React from 'react';
import { render } from '@testing-library/react';
import Login from './login';

describe('Login component', () => {

  it('renders without crashing', () => {
    render(<Login />);
  });

  it('matches its snapshot', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('contains username and password inputs', () => {
    const { getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
