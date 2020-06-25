import { createStore, applyMiddleware, compose } from 'redux';

import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  const store = createStore(createReducer(), initialState);

  return store;
}
