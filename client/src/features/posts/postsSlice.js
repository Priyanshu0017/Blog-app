import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await postsService.getPosts(token);
  }
);

export const fetchPost = createAsyncThunk(
  "posts/fetchOne",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await postsService.getPost(id, token);
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (data, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await postsService.createPost(data, token);
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await postsService.updatePost(id, data, token);
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await postsService.deletePost(id, token);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetPostState: (state) => {
      state.post = null;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.meta.arg);
      });
  },
});

export const { resetPostState } = postsSlice.actions;
export default postsSlice.reducer;