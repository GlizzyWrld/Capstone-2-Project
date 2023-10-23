import React from 'react';
import { render } from '@testing-library/react';
import Fod from './fod';

describe('Fod', () => {

  it('renders without crashing', () => {
    render(<Fod />);
  });

  it('matches its snapshot', () => {
    const { asFragment } = render(<Fod />);
    expect(asFragment()).toMatchSnapshot();
  });
});
