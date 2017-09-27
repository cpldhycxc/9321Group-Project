import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const middlewares = [promise(), thunk, process.env.NODE_ENV !== 'production' && createLogger()].filter(Boolean);
const middleware = applyMiddleware(...middlewares);
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, middleware);
