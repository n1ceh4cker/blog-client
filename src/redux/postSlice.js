import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectUser } from './authSlice';

const initialState = {
  status: 'uninitialized',
  error: null,
  data: []
};
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async () => {
    const url = 'post/all';
    const res = await axios.get(url);
    return res.data;
  },
  {
    condition: (arg, { getState, extra }) => {
      const { status } = getState().post;
      if (status === 'loading' || status === 'succeeded') {
        return false;
      }
    }
  }
);
export const savePost = createAsyncThunk('post/savePost', async (data) => {
  const url = 'post';
  const res = await axios.post(url, data);
  return res.data;
});
export const editPost = createAsyncThunk('post/editPost', async ({ data, id }) => {
  const url = 'post/' + id;
  const res = await axios.put(url, data);
  return res.data;
});
export const toggleLikePost = createAsyncThunk('post/toggleLikePost', async (id) => {
  const url = 'post/' + id + '/like';
  const res = await axios.post(url);
  return res.data;
});
export const commentPost = createAsyncThunk('post/commentPost', async ({ data, id }) => {
  const url = 'post/' + id + '/comment';
  const res = await axios.post(url, data);
  return res.data;
});
const postSlice = createSlice({
  initialState: initialState,
  name: 'post',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        state.data = [];
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const filterdata = state.data.filter((d) => d.id !== action.payload.data.id);
        filterdata.push(action.payload.data);
        state.data = filterdata;
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        const filterdata = state.data.filter((d) => d.id !== action.payload.data.id);
        filterdata.push(action.payload.data);
        state.data = filterdata;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const filterdata = state.data.filter((d) => d.id !== action.payload.data.id);
        filterdata.push(action.payload.data);
        state.data = filterdata;
      });
  }
});

export default postSlice.reducer;
const selectPost = (state) => state.post;
export const selectIsLoading = createSelector(selectPost, (post) => post.status === 'loading');
export const selectError = createSelector(selectPost, (post) => post.error);
export const selectAllPosts = createSelector(selectPost, (post) => post.data);
export const selectPostById = createSelector([selectAllPosts, (post, id) => id], (posts, id) => posts.find((p) => p.id === id));
export const selectPostsByUser = createSelector([selectAllPosts, (post, id) => id], (posts, id) => posts.filter((p) => p.author.id === id));
export const selectCurrentUserPosts = createSelector(selectUser, selectAllPosts, (user, posts) => {
  if (user) {
    return posts.filter((p) => p.author.id === user.id);
  } else {
    return null;
  }
});
