import React, { useState } from 'react';
import { Typography, TextField, Button, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { addComment } from '../../actions/posts';
const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.auth.authData);
  const handleClick = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    const newComments = await addComment(finalComment, post._id, dispatch);
    setComments(newComments);
    setComment('');
  };
  return (
    <div>
      <div className={classes.commentOuterContainer}>
        <div className={classes.commentInnerContainer}>
          <div className={classes.commentDiv2}>
            <Avatar className={classes.avatar} alt={'None'} variant='rounded'>
              {comments.length}
            </Avatar>
            <Typography
              style={{ fontWeight: 'bold' }}
              gutterBottom
              variant='h6'
            >
              Comments
            </Typography>
          </div>
          {comments.length > 0 ? (
            comments.map((c, i) => (
              <div className={classes.commentDiv} key={i}>
                <Avatar className={classes.purple} alt={'None'}>
                  {i + 1}
                </Avatar>{' '}
                <Typography className={classes.typography}>{c}</Typography>
              </div>
            ))
          ) : (
            <Typography variant='subtitle1'>
              No comments have been added yet!
            </Typography>
          )}
        </div>

        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
              Writa a comment
            </Typography>
            <br />
            <TextField
              label='comment'
              fullWidth
              variant='outlined'
              minRows={4}
              multiline
              onChange={(e) => {
                setComment(e.target.value);
                console.log(e.target.value);
                console.log('************');
                console.log(comment);
              }}
              value={comment}
            />
            <Button
              style={{ marginTop: '10px' }}
              variant='contained'
              fullWidth
              disabled={!comment}
              onClick={handleClick}
              color='primary'
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
