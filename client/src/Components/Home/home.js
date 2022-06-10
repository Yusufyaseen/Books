import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // For dispatching an action to a reducer
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import Form from '../Form/form';
import Posts from '../Posts/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination/pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const searchPost = () => {
    if (searchTitle.trim().length > 0 || tags.length > 0) {
      getPostsBySearch({ searchTitle, tags: tags.join(',') }, dispatch);
      navigate(
        `/posts/search?searchQuery=${searchTitle || 'none'}&tags=${
          tags.join(',') || 'none'
        }`
      );
    } else {
      navigate('/');
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPost();
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, String(tag).toLowerCase()]);
  };
  const handleDelete = (deletedTag) => {
    setTags(tags.filter((tag) => tag !== deletedTag));
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <AppBar
              className={classes.appBarSerach}
              position='static'
              color='inherit'
              elevation={6}
            >
              <TextField
                type='search'
                name='search'
                variant='outlined'
                label='search in title'
                fullWidth
                onKeyPress={handleKeyPress}
                value={searchTitle}
                onChange={(e) => {
                  setSearchTitle(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                variant='outlined'
                value={tags}
                label='search by tag'
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
              <Button onClick={searchPost} variant='contained' color='primary'>
                Search
              </Button>
            </AppBar>
            <Form
              className={classes.form}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
