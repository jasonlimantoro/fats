import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const selectClass =
  'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500';

const SelectField = ({ field, form: { touched, errors }, options, label, id, ...props }) => {
  return (
    <>
      <label className="label label-block" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <select
          className={cls(selectClass, {
            'border-red-500 border': !!(touched[field.name] && errors[field.name]),
          })}
          id={id}
          {...field}
          {...props}
        >
          <option value="">Select {label}</option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {errors[field.name] && touched[field.name] && (
        <p className="text-red-500 italic text-xs">{errors[field.name]}</p>
      )}
    </>
  );
};

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
};

SelectField.defaultProps = {};

export default SelectField;
