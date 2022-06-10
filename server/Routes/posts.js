import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();
import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from '../controllers/posts.js';
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.post('/:id/comment', auth, commentPost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likepost', auth, likePost);
router.delete('/:id', auth, deletePost);
export default router;
