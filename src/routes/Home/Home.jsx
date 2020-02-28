import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import SelectField from 'components/Form/SelectField';
import { reverse } from 'named-urls';
import { routes } from 'config/routes';
import { initialValues, validationSchema } from './schema';

const Home = ({ history }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p className="font-bold text-3xl">Take Attendance</p>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          history.push(reverse(String(routes.camera.semester), { semesterId: values.semester }));
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-1/3">
            <div className="mb-4">
              <Field
                id="semester"
                component={SelectField}
                name="semester"
                label="Semester"
                options={[
                  { label: 'semester 1', value: 'semester 1' },
                  { label: 'semester 2', value: 'semester 2' },
                ]}
              />
            </div>
            <button type="submit" className="btn w-full btn-gray">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
