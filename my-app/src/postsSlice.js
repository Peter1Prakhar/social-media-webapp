import { createSlice } from '@reduxjs/toolkit';

// Load posts from localStorage or start with an empty array
const loadPosts = () => {
  const savedPosts = localStorage.getItem('posts');
  return savedPosts ? JSON.parse(savedPosts) : [];
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: loadPosts(),
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        ...action.payload,
        id: Date.now(), // Use timestamp as unique ID
        createdAt: new Date().toISOString()
      };
      state.push(newPost);
      localStorage.setItem('posts', JSON.stringify(state));
    },
    editPost: (state, action) => {
      const { id, title, content } = action.payload;
      const postToEdit = state.find(post => post.id === id);
      if (postToEdit) {
        postToEdit.title = title;
        postToEdit.content = content;
        localStorage.setItem('posts', JSON.stringify(state));
      }
    },
    deletePost: (state, action) => {
      const filteredPosts = state.filter(post => post.id !== action.payload);
      localStorage.setItem('posts', JSON.stringify(filteredPosts));
      return filteredPosts;
    }
  }
});

export const { addPost, editPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;