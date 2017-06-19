import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// these bootstrap stylesheets need to be imported before local components
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { App } from './containers';

import store from './store';

import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
