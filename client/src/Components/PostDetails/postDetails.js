import React, { useEffect } from 'react';
import {
  CircularProgress,
  Divider,
  Chip,
  CardContent,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import { useNavigate, useParams, Link } from 'react-router-dom';
import moment from 'moment';
import CommentSection from './comments';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, getPostsBySearch } from '../../actions/posts';
const PostDetails = () => {
  const classes = useStyles();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getPost(id, dispatch);
  }, [id]);

  useEffect(() => {
    if (post) {
      getPostsBySearch(
        { searchTitle: 'none', tags: post.tags.join(',') },
        dispatch
      );
    }
  }, [post]);
  const goToPost = (id) => {
    navigate(`/posts/${id}`);
  };

  if (!post) return null;
  if (isLoading || !posts) {
    return (
      <Paper className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  if (post)
    return (
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant='h3' component='h2'>
              {post.title}
            </Typography>
            <Typography
              style={{ fontWeight: 'bold', fontSize: '15px', color: '#a09d9d' }}
              variant='h6'
            >
              Created by: {post.name}
            </Typography>
            <Typography variant='h6' color='textSecondary' component='h2'>
              <CardContent className={classes.cardContetnt}>
                {post.tags.length > 0 ? (
                  post.tags.map((tag) => (
                    <Chip
                      key={Math.random() * 100000}
                      label={tag}
                      className={classes.chip}
                      color='secondary'
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
            </Typography>
            <Typography
              gutterBottom
              color='textSecondary'
              variant='body1'
              component='p'
            >
              {post.message}
            </Typography>
            <Typography
              variant='body1'
              style={{ fontWeight: 'bold', color: '#F04D56' }}
            >
              {moment(post.createdAt).fromNow()}
            </Typography>
            <a
              href={post.pdf}
              target='_blank'
              rel='noreferrer'
              style={{ textDecoration: 'none' }}
            >
              <Button variant='contained' color='primary' size='small'>
                Download
              </Button>
            </a>
            <Divider style={{ margin: '20px 0' }} />
            {/* <Typography variant='body1'>
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: '20px 0' }} /> */}
            <CommentSection post={post} />
            <Divider style={{ margin: '20px 0' }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                post.image ||
                'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
              }
              alt={post.title}
            />
          </div>
        </div>
        {recommendedPosts.length > 0 && (
          <div className={classes.section}>
            <Typography
              gutterBottom
              variant='h5'
              style={{ fontWeight: 'bold', color: '#F04D56' }}
            >
              You may also like:
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({ title, messsage, name, likes, image, _id }) => (
                  <div
                    style={{ margin: '20px', cursor: 'pointer' }}
                    onClick={() => goToPost(_id)}
                    key={_id}
                  >
                    <Typography
                      gutterBottom
                      variant='h6'
                      style={{ fontWeight: 'bold' }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='subtitle2'
                      style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: '#bfc0c1',
                      }}
                    >
                      {name}
                    </Typography>
                    <Typography gutterBottom variant='subtitle2'>
                      {messsage}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='subtitle1'
                      style={{
                        fontSize: '15px',
                        color: '#6a6a6b',
                      }}
                    >
                      Likes: {likes.length}
                    </Typography>
                    <img
                      className={classes.media2}
                      src={
                        image ||
                        'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                      }
                      alt={post.title}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </Paper>
    );
};
// gutterBottom : To give some margin at bottom
export default PostDetails;
