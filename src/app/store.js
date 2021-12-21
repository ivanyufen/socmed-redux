import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postReducer from '../features/post/postSlice';
import albumReducer from '../features/album/albumSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    album: albumReducer,
  },
});
