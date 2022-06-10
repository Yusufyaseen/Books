import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import ChipInput from 'material-ui-chip-input';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
    image: '',
  });
  const [chipTags, setChipTags] = useState([]);
  const navigate = useNavigate();
  const handleAdd = (tag) => {
    setChipTags([...chipTags, String(tag).toLowerCase()]);
    setPostData({
      ...postData,
      tags: [...chipTags, String(tag).toLowerCase()],
    });
  };
  const handleDelete = (deletedTag) => {
    setChipTags(chipTags.filter((tag) => tag !== deletedTag));
    setPostData({
      ...postData,
      tags: chipTags.filter((tag) => tag !== deletedTag),
    });
  };
  const user = useSelector((state) => state.auth.authData);
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) {
      setPostData(post);
      setChipTags(post.tags);
    }
  }, [post]);
  const handleField = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setPostData({
      ...postData,
      selectedFile: e.target.files[0],
    });
  };
  const clear = () => {
    setCurrentId(0);
    setChipTags([]);
    setPostData({
      title: '',
      message: '',
      tags: [],
      selectedFile: '',
      image: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    if (currentId) {
      updatePost(currentId, { ...postData, name: user.result.name }, dispatch);
      clear();
    } else {
      createPost({ ...postData, name: user.result.name }, navigate, dispatch);
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please, Sign in to create new memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
        <Typography variant='h6'>
          {currentId ? `Editing ${post.title || 'Null'}` : 'Add a Book'}
        </Typography>

        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={handleField}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={handleField}
        />
        <ChipInput
          style={{ margin: '10px 7px' }}
          variant='outlined'
          value={chipTags}
          fullWidth
          label='add tags'
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
        <div className={classes.fileInput}>
          <strong>Image</strong> &nbsp;
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
          />
        </div>
        <div className={classes.fileInput}>
          <strong>Pdf</strong> &nbsp;{' '}
          <input name='foo' type='file' onChange={handleFile} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
