import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

const TextField = ({ field, form: { touched, errors }, label, id, className, ...rest }) => {
  return (
    <>
      <label className="label label-block" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={cls(className, 'input', {
          'border-red-500 border': !!(errors[field.name] && touched[field.name]),
        })}
        {...field}
        {...rest}
      />
      {errors[field.name] && touched[field.name] && (
        <p className="text-red-500 italic text-xs">{errors[field.name]}</p>
      )}
    </>
  );
};

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

TextField.defaultProps = {};

export default TextField;
