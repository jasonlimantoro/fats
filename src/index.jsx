import React from 'react';
import ReactDOM from 'react-dom';
import { startMirage } from 'lib/mirage';
import Root from './components/Root';
import './stylesheets/app.scss';

if (process.env.NODE_ENV === 'development') {
  startMirage();
}

ReactDOM.render(<Root />, document.getElementById('app'));
