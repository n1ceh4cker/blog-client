import React from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import CreatePost from './components/CreatePost';
import CreateProfile from './components/CreateProfile';
import MyPost from './components/MyPost';
import Profile from './components/Profile';
import Home from './components/Home';
import Header from './components/Header';
import Post from './components/Post';

import { fetchPosts } from './redux/postSlice';
import { fetchProfiles, selectCurrentProfile } from './redux/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from './redux/authSlice';

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentProfile = useSelector(selectCurrentProfile);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      element: <Header />,
      loader: async () => {
        dispatch(fetchPosts());
        dispatch(fetchProfiles());
        return true;
      },
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile',
          element: <Profile />,
          loader: () => {
            if (!isAuthenticated) {
              return redirect('/');
            } else if (!currentProfile) {
              return redirect('/createprofile');
            } else {
              return null;
            }
          }
        },
        {
          path: '/profile/:id',
          element: <Profile />
        },
        {
          path: '/createprofile',
          element: <CreateProfile />,
          loader: () => {
            if (!isAuthenticated) {
              return redirect('/');
            } else if (currentProfile) {
              return redirect('/profile');
            } else {
              return null;
            }
          }
        },
        {
          path: '/editprofile',
          element: <CreateProfile />,
          loader: () => {
            if (!isAuthenticated) {
              return redirect('/');
            } else if (!currentProfile) {
              return redirect('/createprofile');
            } else {
              return null;
            }
          }
        },
        {
          path: '/post/:id',
          element: <Post />
        },
        {
          path: '/mypost',
          element: <MyPost />,
          loader: () => {
            if (!isAuthenticated) {
              return redirect('/');
            } else {
              return null;
            }
          }
        },
        {
          path: '/createpost',
          element: <CreatePost />,
          loader: () => {
            if (!isAuthenticated) {
              return redirect('/');
            } else if (!currentProfile) {
              toast.warning('Create your profile before posting!!!');
              return redirect('/createprofile');
            } else {
              return null;
            }
          }
        },
        {
          path: '/createpost/:id',
          element: <CreatePost />,
          loader: () => {
            if (!isAuthenticated) {
              return redirect('/');
            } else if (!currentProfile) {
              toast.warning('Create your profile before posting!!!');
              return redirect('/createprofile');
            } else {
              return null;
            }
          }
        }
      ]
    }
  ]);
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <RouterProvider router={router} />
      </AnimatePresence>
      <ToastContainer />
    </>
  );
};

export default App;
