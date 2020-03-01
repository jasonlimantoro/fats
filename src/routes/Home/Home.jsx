import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import SelectField from 'components/Form/SelectField';
import { routes } from 'config/routes';
import { feedData } from '@/ui/home/actions';
import { selectFormData } from '@/ui/home/selector';
import { setSession } from '@/ui/camera/actions';
import { initialValues, validationSchema } from './schema';

const semesterToString = ({ number, year_start }) => {
  return `AY ${year_start}/${year_start + 1} Semester ${number}`;
};

const timetableToString = (timetable, lab) => {
  return `${timetable.lab}-${lab.course}-${lab.name} (${timetable.start_at}-${timetable.end_at})`;
};

const scheduleToString = schedule => {
  return `${schedule.label} (Week ${schedule.week})`;
};

const Home = ({ history, feedData, formData, setSession }) => {
  React.useEffect(
    () => {
      feedData();
    },
    [feedData],
  );
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p className="font-bold text-3xl">Take Attendance</p>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          setSession(values);
          history.push(routes.camera);
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-1/3">
            <div className="mb-4">
              <Field
                id="semester"
                component={SelectField}
                name="semester"
                label="Semester"
                options={Object.keys(formData.semesters).map(k => {
                  const semester = formData.semesters[k];
                  return {
                    value: semester.id,
                    label: semesterToString(semester),
                  };
                })}
              />
            </div>
            {values.semester && (
              <div className="mb-4">
                <Field
                  id="timetable"
                  disabled={!values.semester}
                  component={SelectField}
                  name="timetable"
                  label="Timetable"
                  options={formData.semesters[values.semester].timetable_set.map(id => ({
                    value: id,
                    label: timetableToString(
                      formData.timetables[id],
                      formData.labs[formData.timetables[id].lab],
                    ),
                  }))}
                />
              </div>
            )}
            {values.timetable && (
              <div className="mb-4">
                <Field
                  id="schedule"
                  component={SelectField}
                  name="schedule"
                  label="Schedule"
                  options={formData.labs[formData.timetables[values.timetable].lab].completeSchedule
                    .filter(({ past }) => past)
                    .map(s => ({
                      label: scheduleToString(s),
                      value: s.relatedSchedule,
                    }))}
                />
              </div>
            )}
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
  feedData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setSession: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  formData: selectFormData(state),
});

const mapDispatchToProps = { feedData, setSession };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
