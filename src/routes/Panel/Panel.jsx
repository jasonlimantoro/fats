import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ match }) => {
  const { params } = match;
  return <div>Panel {params.domain}</div>;
};

Panel.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      domain: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Panel.defaultProps = {};

export default Panel;
