import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import rootReducer, { history } from 'modules';
import createStore from 'store/createStore';
import { ConnectedRouter } from 'connected-react-router';
import App from 'routes';

const Root = ({ config }) => {
  return (
    <Provider store={config.reduxStore}>
      <ConnectedRouter history={config.history}>
        <App />
      </ConnectedRouter>
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
    history,
  },
};

export default Root;
