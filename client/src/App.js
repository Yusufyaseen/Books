import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar/navbar';
import Home from './Components/Home/home';
import Auth from './Components/Auth/auth';
import PostDetails from './Components/PostDetails/postDetails';
const App = () => {
  const user = useSelector((state) => state.auth.authData);
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Navigate to='/posts' />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route
            path='/auth'
            exact
            element={!user ? <Auth /> : <Navigate to='/posts' />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
