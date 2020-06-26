import produce from 'immer';

import {
  LOAD_USER,
  UPDATE_USER,
  LOAD_USER_ERROR,
  REMOVE_USER,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: true,
  error: false,
  currentUser: false,
  userData: {
    username: false,
    avatar: false,
    email: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_USER:
        draft.loading = false;
        draft.error = false;
        draft.currentUser = true;
        draft.userData = action.user;
        break;

      case UPDATE_USER:
        draft.loading = false;
        draft.error = false;
        draft.currentUser = true;
        draft.userData = action.user;
        break;

      case LOAD_USER_ERROR:
        draft.loading = false;
        draft.error = true;
        draft.currentUser = false;
        draft.userData = false;
        break;

      case REMOVE_USER:
        draft.loading = false;
        draft.error = false;
        draft.currentUser = false;
        draft.userData = false;
    }
  });

export default appReducer;
