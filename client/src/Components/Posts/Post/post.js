import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
} from '@material-ui/core/';
import { useNavigate } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.authData);
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const hasLiked = post.likes.find((like) => like === user?.result?._id);
  const handleLike = () => {
    likePost(post._id, dispatch);
    if (hasLiked) {
      setLikes(post?.likes?.filter((id) => id !== user?.result?._id));
    } else {
      setLikes([...post?.likes, user?.result?._id]);
    }
  };
  const Likes = () => {
    if (likes.length > 0 && user) {
      return likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}{' '}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize='small' /> &nbsp;{likes.length}{' '}
          {likes.length > 1 ? 'likes' : 'like'}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize='small' /> &nbsp;Like
      </>
    );
  };

  const goToPost = () => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <div onClick={goToPost} style={{ cursor: 'pointer' }}>
        <CardMedia
          className={classes.media}
          image={
            post.image ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(String(post.createdAt)).fromNow()}
          </Typography>
        </div>
      </div>

      {post.creator === user?.result?._id ||
      user?.result?.email === process.env.REACT_APP_EMAIL ? (
        <div className={classes.overlay2}>
          {' '}
          <Button
            style={{ color: 'white' }}
            size='small'
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize='medium' />
          </Button>{' '}
        </div>
      ) : null}

      <CardContent className={classes.cards}>
        {post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <Chip
              key={Math.random() * 100000}
              label={tag}
              className={classes.chip}
              color='primary'
            />
          ))
        ) : (
          <Chip
            key={Math.random() * 100000}
            label='No Tags'
            className={classes.chip}
            color='default'
            variant='outlined'
          />
        )}
      </CardContent>
      <Typography
        className={classes.title}
        gutterBottom
        variant='h5'
        component='h2'
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          disabled={!user?.result}
          size='small'
          color='primary'
          // onClick={() => likePost(post._id, dispatch)}
          onClick={handleLike}
        >
          <Likes />
        </Button>

        {post.creator === user?.result?._id ||
        user?.result?.email === process.env.REACT_APP_EMAIL ? (
          <Button
            size='small'
            color='secondary'
            onClick={() => deletePost(post._id, dispatch)}
          >
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Post;
