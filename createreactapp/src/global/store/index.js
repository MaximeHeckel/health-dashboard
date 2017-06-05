import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducer';

const loggerMiddleware = createLogger();

let middlewares = applyMiddleware(
  promiseMiddleware()
);

if (process.env.NODE_ENV === 'development') {
  middlewares = applyMiddleware(
    promiseMiddleware(),
    loggerMiddleware
  );
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    middlewares,
  );

  return store;
}
