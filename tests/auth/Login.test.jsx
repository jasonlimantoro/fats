import React from 'react';
import { renderer } from 'tests/utils/renderer';
import { fireEvent } from '@testing-library/react';
import { routes } from 'config/routes';
import App from 'routes';

describe('Login', () => {
  it('should validate invalid inputs', async () => {
    const { getAllByText, getByLabelText, findAllByText } = renderer(<App />, {
      route: routes.login,
    });
    expect(getAllByText(/login/i).length).toBeGreaterThan(0);
    fireEvent.blur(getByLabelText('Username'));
    fireEvent.blur(getByLabelText('Password'));
    expect(await findAllByText(/required/i)).toHaveLength(2);
  });
  it('should display error when the backend API returns error', () => {});
  it('should redirect to panel based on the domain', () => {});
});
