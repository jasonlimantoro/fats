import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import rootReducer from 'modules';
import createStore from 'store/createStore';
import { BrowserRouter } from 'react-router-dom';
import App from 'routes';

const Root = ({ config }) => {
  return (
    <Provider store={config.reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
    history: PropTypes.object,
  }),
};

Root.defaultProps = {
  config: {
    reduxStore,
  },
};

export default Root;
