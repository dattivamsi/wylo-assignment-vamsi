// src/redux/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push({ ...action.payload, id: state.length + 1 });
    },
    editPost: (state, action) => {
      const index = state.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addPost, editPost } = postsSlice.actions;
export default postsSlice.reducer;
