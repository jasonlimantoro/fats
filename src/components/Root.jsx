import React from 'react';
import PropTypes from 'prop-types';
import { ThroughProvider } from 'react-through';
import { Provider } from 'react-redux';
import rootReducer from 'modules';
import createStore from 'store/createStore';
import { BrowserRouter } from 'react-router-dom';
import App from 'routes';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const Root = ({ config }) => {
  return (
    <Provider store={config.reduxStore}>
      <PersistGate loading={null} persistor={config.persistor}>
        <ThroughProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThroughProvider>
      </PersistGate>
    </Provider>
  );
};

const reduxStore = createStore(rootReducer);
const persistor = persistStore(reduxStore);
Root.propTypes = {
  /**
   * Global configurations / providers to be used within the app
   */
  config: PropTypes.shape({
    reduxStore: PropTypes.object,
    persistor: PropTypes.object,
  }),
};

Root.defaultProps = {
  config: {
    reduxStore,
    persistor,
  },
};

export default Root;
