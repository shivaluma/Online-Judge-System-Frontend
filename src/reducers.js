import { combineReducers } from 'redux';

import globalReducer from './containers/App/reducers';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({ global: globalReducer });

  return rootReducer;
}
