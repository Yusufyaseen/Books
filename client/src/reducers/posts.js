/* eslint-disable import/no-anonymous-default-export */
// reducer is a function that take the state(always needs to be equal to something) and action object

import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_POST,
  UPDATE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  STOP_LOADING,
  COMMENT,
} from '../constants/actionTypes.js';

export default (state = { isLoading: false, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        total: action.payload.total,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        total: state.total + 1,
      };
    case UPDATE:
    case LIKE:
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        total: state.total - 1,
      };

    default:
      return state;
  }
};
