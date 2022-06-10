// It contains the logic of the app

import mongoose from 'mongoose';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postMessage from '../model/postMessages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const Limit = 6;
    const startIndex = (Number(page) - 1) * Limit;
    const total = await postMessage.countDocuments({});
    const posts = await postMessage
      .find({})
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(Limit);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      total,
      numberOfPages: Math.ceil(total / Limit),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i');
    const posts = await postMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });
    res.status(202).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const FORM = req.body;
  try {
    const file = req.files.selectedFile;

    const newPath = path.resolve(__dirname + '/../uploads');
    console.log(newPath);
    const filename = file.name.split(' ').join('_');
    file.mv(`${newPath}/${filename}`, (err) => {
      if (err) {
        // res.status(500).send({ message: 'File upload failed', code: 200 });
      }
      // res.status(200).send({ message: 'File Uploaded', code: 200 });
    });
    const tags = FORM.tags.split(',');
    console.log(tags.length);
    const post = { ...FORM, tags: tags.length > 0 && tags[0] ? tags : [] };
    post.pdf = `http://localhost:5000/uploads/${filename}`;
    // console.log(post);

    const newPost = await postMessage.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

    await newPost.save();
    console.log('Done');
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await postMessage.findByIdAndRemove(id);
  res.json({ message: 'Post deleted successfully.' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.status(404).json({ message: 'Unauthenticated' });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id ${id}`);
  const post = await postMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  console.log(post);
  const updatePost = await postMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatePost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const post = await postMessage.findById(id);
  console.log(comment);

  post.comments.unshift(comment);
  const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  console.log(updatedPost);

  res.status(200).json(updatedPost);
};
