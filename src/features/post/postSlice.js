import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  postDetail: {},
  status: 'idle',
};

export const fetchPostAsync = createAsyncThunk(
  'post/fetchPost',
  async (userId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    return response.data;
  }
);

export const fetchPostDetailAsync = createAsyncThunk(
  'post/fetchPostDetail',
  async (postId) => {
    const postDetail = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const postComments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const data = {
      ...postDetail.data,
      comments: postComments.data,
    }
    return data;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePost: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(fetchPostDetailAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPostDetailAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.postDetail = action.payload;
      })
  },
});

export const { updatePost } = postSlice.actions;

export const selectStatus = (state) => state.post.status;
export const selectPosts = (state) => state.post.posts;
export const selectPostDetail = (state) => state.post.postDetail;

export default postSlice.reducer;
