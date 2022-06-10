import React, { useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
// import memories from '../../images/memories.png';
import b2 from '../../images/b.jpg';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './styles';
import { logout } from '../../actions/auth';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode';
const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state) => state.auth.authData);
  const { total } = useSelector((state) => state.posts);
  const logOut = () => logout(dispatch);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decoded = decode(token);
      if (decoded.exp * 1000 < new Date().getTime()) logOut();
    }
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link
        to='/'
        className={classes.brandContainer}
        style={{ textDecoration: 'none' }}
      >
        {/* <img
          className={classes.image}
          src={memoriesText}
          alt='icon'
          height='30px'
        /> */}
        <Typography className={classes.heading}>BookPro</Typography>
        <img className={classes.image} src={b2} alt='icon' height='60px' />
      </Link>
      <Avatar className={classes.allbooks} variant='rounded' alt={'res'}>
        {total}&nbsp;Books Available
      </Avatar>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              onClick={logOut}
              component={Link}
              to='/'
              variant='contained'
              className={classes.logout}
              color='secondary'
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
