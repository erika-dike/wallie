import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import api from './middlewares/api';

import reducer from './reducers';

const middleware = composeWithDevTools(applyMiddleware(api, thunk));

export default createStore(reducer, middleware);
