import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  UPDATE_USER,
} from './constants';

export function loadUser(user) {
  return {
    type: LOAD_USER,
    user,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export function userLoaded(user) {
  return {
    type: LOAD_USER_SUCCESS,
    user,
  };
}

export function userLoadingError() {
  return {
    type: LOAD_USER_ERROR,
  };
}
