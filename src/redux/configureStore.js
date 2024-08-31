import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import authSlice from './authSlice';
import postSlice from './postSlice';
import profileSlice from './profileSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      auth: authSlice,
      post: postSlice,
      profile: profileSlice
    })
  )
});

export const persistor = persistStore(store);
