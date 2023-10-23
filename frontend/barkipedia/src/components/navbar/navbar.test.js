import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './navbar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navbar', () => {

  it('renders without crashing', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  });

  it('contains the "Barkipedia" link', () => {
    const { getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    const barkipediaLink = getByText('Barkipedia');
    expect(barkipediaLink).toBeInTheDocument();
  });

  it('contains the "Login" link', () => {
    const { getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    const loginLink = getByText('Login');
    expect(loginLink).toBeInTheDocument();
  });

});
