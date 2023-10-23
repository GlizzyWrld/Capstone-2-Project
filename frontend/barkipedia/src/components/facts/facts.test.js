import React from 'react';
import { render } from '@testing-library/react';
import Facts from './facts'; 

jest.mock('axios');


describe('<Facts />', () => {
  it('renders without errors', () => {
    render(<Facts />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Facts />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('has "Get Facts" button', () => {
    const { getByText } = render(<Facts />);
    expect(getByText('Get Facts')).toBeInTheDocument();
  });
});
