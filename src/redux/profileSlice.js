import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectUser } from './authSlice';

const initialState = {
  status: 'uninitialized',
  error: null,
  data: []
};
export const fetchProfiles = createAsyncThunk(
  'profile/fetchProfiles',
  async () => {
    const url = 'profile/all';
    const res = await axios.get(url);
    return res.data;
  },
  {
    condition: (arg, { getState, extra }) => {
      const { status } = getState().profile;
      if (status === 'loading' || status === 'succeeded') {
        return false;
      }
    }
  }
);
export const saveProfile = createAsyncThunk('profile/saveProfile', async (data) => {
  const url = 'profile';
  const res = await axios.post(url, data);
  return res.data;
});
export const editProfile = createAsyncThunk('profile/editProfile', async (data) => {
  const url = 'profile';
  const res = await axios.put(url, data);
  return res.data;
});
const profileSlice = createSlice({
  initialState: initialState,
  name: 'profile',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state, action) => {
        state.status = 'loading';
        state.data = [];
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.data = [];
        state.error = action.error.message;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        let filterdata = state.data.filter((d) => d.id !== action.payload.data.id);
        filterdata.push(action.payload.data);
        state.data = filterdata;
      });
  }
});

export default profileSlice.reducer;
const selectProfile = (state) => state.profile;
export const selectIsLoading = createSelector(selectProfile, (profile) => profile.status === 'loading');
export const selectError = createSelector(selectProfile, (profile) => profile.error);
export const selectAllProfiles = createSelector(selectProfile, (profile) => profile.data);
export const selectProfileById = createSelector([selectAllProfiles, (profile, id) => id], (profiles, id) => profiles.find((p) => p.id === id));
export const selectProfileByCreator = createSelector([selectAllProfiles, (profile, id) => id], (profiles, id) => profiles.find((p) => p.creator.id === id));
export const selectCurrentProfile = createSelector([selectUser, selectAllProfiles], (user, profiles) => {
  if (user) {
    return profiles.find((p) => p.creator.id === user.id);
  } else {
    return null;
  }
});
