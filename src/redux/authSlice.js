import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'uninitiated',
  token: null,
  user: null,
  expiresIn: null,
  error: null
};
export const loginUser = createAsyncThunk('auth/loginUser', async (creds) => {
  const url = 'auth/login';
  const res = await axios.post(url, creds);
  return res.data;
});
export const signupUser = async (creds) => {
  const url = 'auth/signup';
  const res = await axios.post(url, creds);
  return res.data;
};
const authSlice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.expiresIn = null;
      state.user = null;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, expiresIn, user } = action.payload.data;
        state.user = user;
        state.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', expiresIn);
        state.expiresIn = expiresIn;
        state.status = 'succeeded';
      })
      .addCase(loginUser.pending, (state, action) => {
        state.token = null;
        state.expiresIn = null;
        state.user = null;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
const selectAuth = (state) => state.auth;

export const selectToken = createSelector(selectAuth, (auth) => auth.token);
export const selectIsAuthenticated = createSelector(selectAuth, (auth) => auth.token !== null);
export const selectIsLoading = createSelector(selectAuth, (auth) => auth.status === 'loading');
export const selectError = createSelector(selectAuth, (auth) => auth.error);
export const selectUser = createSelector(selectAuth, (auth) => auth.user);

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
