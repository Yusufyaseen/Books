/* eslint-disable import/no-anonymous-default-export */
// reducer is a function that take the state(always needs to be equal to something) and action object

import { AUTH, LOGOUT } from '../constants/actionTypes.js';

export default (
  state = {
    authData: localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile'))
      : null,
  },
  action
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};
