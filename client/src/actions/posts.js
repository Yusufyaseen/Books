import * as api from '../api/index.js';
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  STOP_LOADING,
  FETCH_POST,
  COMMENT,
} from '../constants/actionTypes.js';

// Action Creators are  => functions that return actions, And an action is an object that has the type and payload
export const getPosts = async (page, dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    console.log(data);
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = async (id, dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    console.log(data);
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = async (searchQuery, dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post, navigate, dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    console.log(data);
    navigate(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = async (id, post, dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (id, dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (id, dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (comment, id, dispatch) => {
  try {
    const { data } = await api.comment(comment, id);
    dispatch({ type: COMMENT, payload: data });
    return data?.comments;
  } catch (error) {
    console.log(error);
  }
};
