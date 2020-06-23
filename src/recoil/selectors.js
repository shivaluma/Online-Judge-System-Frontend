import { selector } from 'recoil';

import API from '../api';

export const currentUserQuery = selector({
  key: 'currentUser',
  get: async ({ get }) => {
    try {
      const response = await API.get('/user/me');
      return response.data;
    } catch (err) {
      return null;
    }
  },
});
