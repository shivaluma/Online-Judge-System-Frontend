import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectGlobal = (state) => state.global || initialState;

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, (globalState) => globalState.currentUser);

const makeSelectUserData = () =>
  createSelector(selectGlobal, (globalState) => globalState.userData);

const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.loading);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectUserData,
};
