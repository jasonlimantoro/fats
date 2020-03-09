import React from 'react';
import { renderer } from 'tests/utils/renderer';
import { fireEvent, waitForElement, wait } from '@testing-library/react';
import { routes } from 'config/routes';
import { Response } from 'miragejs';
import { startMirage } from 'lib/mirage';
import App from 'routes';

let server;

beforeEach(() => {
  server = startMirage({ environment: 'test' });
});

afterEach(() => {
  server.shutdown();
});

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
    server.post('/token', () => new Response(400, {}, { message: 'Invalid credentials' }));
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
    await waitForElement(() => getByText(/failed/i));
  });
  it('should redirect to panel based on the domain', async () => {
    server.createList('schedule', 20);
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
      expect(history.location.pathname).toMatch(/panel\/admin/);
    });
  });
});
