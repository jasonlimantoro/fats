import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import rootReducer from 'modules';
import createStore from 'store/createStore';
import App from 'routes';

const Root = ({ config }) => {
  return (
    <Provider store={config.reduxStore}>
      <App />
    </Provider>
  );
};

const reduxStore = createStore(rootReducer);
Root.propTypes = {
  /**
   * Global configurations / providers to be used within the app
   */
  config: PropTypes.shape({
    reduxStore: PropTypes.object,
  }),
};

Root.defaultProps = {
  config: {
    reduxStore,
  },
};

export default Root;
