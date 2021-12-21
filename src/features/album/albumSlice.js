import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  albums: [],
  albumDetail: [],
  status: 'idle',
};

export const fetchAlbumAsync = createAsyncThunk(
  'album/fetchAlbum',
  async (userId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
    console.log(response)
    return response.data;
  }
);

export const fetchAlbumDetailAsync = createAsyncThunk(
  'post/fetchAlbumDetail',
  async (albumId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
    return response.data;
  }
);

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbumAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.albums = action.payload;
      })
      .addCase(fetchAlbumDetailAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbumDetailAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.albumDetail = action.payload;
      })
  },
});

export const { increment, decrement, incrementByAmount } = albumSlice.actions;

export const selectStatus = (state) => state.album.status;
export const selectAlbums = (state) => state.album.albums;
export const selectAlbumDetail = (state) => state.album.albumDetail;

export default albumSlice.reducer;
