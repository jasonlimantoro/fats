import React from 'react';
import { renderer } from 'tests/utils/renderer';
import { fireEvent, waitForElement, wait } from '@testing-library/react';
import { routes } from 'config/routes';
import mockAxios from 'axios';
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
  it('should display error when the backend API returns error', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject(new Error('Invalid credentials')),
    );
    const { getByLabelText, getByTestId, getByText } = renderer(<App />, {
      route: routes.login,
    });
    fireEvent.change(getByLabelText('Username'), {
      target: {
        value: 'john',
      },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: {
        value: 'pass',
      },
    });
    fireEvent.click(getByTestId('login'));
    await wait(() => expect(mockAxios.post).toBeCalled());
    await waitForElement(() => getByText('Invalid credentials'));
  });
  it('should redirect to panel based on the domain', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          id: '12',
          token: 'some-token',
        },
      }),
    );
    const { getByLabelText, getByTestId, history } = renderer(<App />, {
      route: routes.login,
    });
    fireEvent.change(getByLabelText('Username'), {
      target: {
        value: 'john',
      },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: {
        value: 'pass',
      },
    });
    fireEvent.change(getByLabelText('Domain'), {
      target: {
        value: 'admin',
      },
    });
    fireEvent.click(getByTestId('login'));
    await wait(() => {
      expect(history.location.pathname).toEqual(routes.panel.admin.overview);
    });
  });
});
