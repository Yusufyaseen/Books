import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const API = axios.create({ baseURL: 'https://bookpro123.herokuapp.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req; // So we can make all the below requests
});
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.searchTitle || 'none'}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => {
  const form = new FormData();
  form.append('title', newPost.title);
  form.append('message', newPost.message);
  form.append('tags', newPost.tags);
  form.append('selectedFile', newPost.selectedFile);
  form.append('name', newPost.name);
  form.append('image', newPost.image);
  return API.post('/posts', form);
};

export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const comment = (comment, id) =>
  API.post(`/posts/${id}/comment`, { comment });
