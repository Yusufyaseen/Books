import React, { useState } from 'react';
import {
  Paper,
  Container,
  Typography,
  Avatar,
  Grid,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
  };
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      signup(formData, navigate, dispatch);
    } else {
      signin(formData, navigate, dispatch);
    }
    console.log(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h6'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='firstname'
                  label='Fisrt Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastname'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email'
              type='email'
              handleChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
            />
            <Input
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name='confirmpassword'
                label='Confirm Password'
                type={showPassword ? 'text' : 'password'}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>

          <Button
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <Grid container justifyContent='center'>
            <Button variant='text' onClick={switchMode}>
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
