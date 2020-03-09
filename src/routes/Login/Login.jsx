import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { login } from '@/auth/auth.actions';
import { selectLoginStatus } from '@/auth/auth.selector';
import Alert from 'components/Alert';
import TextField from 'components/Form/TextField';
import SelectField from 'components/Form/SelectField';
import { validationSchema, initialValues, domains } from './schema';

const Login = ({ login, loading, error, history }) => {
  const [showAlert, setShowAlert] = React.useState(false);
  const onClose = React.useCallback(() => {
    setShowAlert(false);
  }, []);
  React.useEffect(
    () => {
      setShowAlert(!!error.message);
    },
    [error.message],
  );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="font-bold text-3xl">Login</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => login(values, history)}
      >
        {() => (
          <Form className="form-box w-1/3">
            <Alert show={showAlert} title="Oh Snap!" type="error" onClose={onClose}>
              <Alert.Title>Oh Snap!</Alert.Title>
              <Alert.Body>{error.message}</Alert.Body>
            </Alert>
            <div className="mb-4">
              <Field
                label="Username"
                id="username"
                name="username"
                component={TextField}
                placeholder="Enter username"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Field
                label="Password"
                id="password"
                name="password"
                type="password"
                component={TextField}
                placeholder="Enter password"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Field
                label="Domain"
                id="domain"
                name="domain"
                component={SelectField}
                options={Object.values(domains)}
              />
            </div>
            <button className="btn btn-gray w-full" type="submit" disabled={loading} data-testid="login">
              Login
            </button>
          </Form>
        )}
      </Formik>
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
