import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { login } from '@/auth/auth.actions';
import { selectLoginStatus } from '@/auth/auth.selector';
import Alert from 'components/Alert';
import cls from 'classnames';
import { validationSchema, initialValues, domains } from './schema';

const labelClass = 'block text-gray-700 font-bold text-sm';
const inputClass =
  'appearance-none w-full shadow rounded py-2 px-4 focus:outline-none focus:shadow-outline';
const selectClass =
  'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500';

const Login = ({ login, loading, error, history }) => {
  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      login(values, history);
    },
  });
  const [showAlert, setShowAlert] = React.useState(false);
  const onClose = React.useCallback(() => {
    setShowAlert(false);
  }, []);
  React.useEffect(
    () => {
      setShowAlert(!!error.message);
    },
    [error],
  );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="font-bold text-3xl">Login</p>
      <form
        onSubmit={form.handleSubmit}
        onReset={form.handleReset}
        autoComplete="off"
        className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <Alert show={showAlert} title="Oh Snap!" type="error" onClose={onClose}>
          <Alert.Title>Oh Snap!</Alert.Title>
          <Alert.Body>{error.message}</Alert.Body>
        </Alert>
        <div className="mb-4">
          <label className={labelClass} htmlFor="username">
            Username
          </label>
          <input
            className={cls(inputClass, {
              'border-red-500 border': !!(
                form.errors.username && form.touched.username
              ),
            })}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.username}
          />
          {form.errors.username && form.touched.username && (
            <p className="text-red-500 italic text-xs">
              {form.errors.username}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            className={cls(inputClass, {
              'border-red-500 border': !!(
                form.touched.password && form.errors.password
              ),
            })}
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.password}
          />
          {form.errors.password && form.touched.password && (
            <p className="text-red-500 italic text-xs">
              {form.errors.password}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className={labelClass} htmlFor="domain">
            Domain
          </label>
          <div className="relative">
            <select
              className={cls(selectClass, {
                'border-red-500 border': !!(
                  form.touched.domain && form.errors.domain
                ),
              })}
              id="domain"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.domain}
            >
              {Object.values(domains).map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {form.errors.domain && form.touched.domain && (
            <p className="text-red-500 italic text-xs">{form.errors.domain}</p>
          )}
        </div>
        <button
          className="btn btn-gray w-full"
          type="submit"
          disabled={loading}
          data-testid="login"
        >
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};

Login.defaultProps = {};

export default connect(
  state => ({
    ...selectLoginStatus(state),
  }),
  { login },
)(Login);
