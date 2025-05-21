import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

// --- Blog Posts ---
export const fetchAllPosts = createAsyncThunk(
  "admin/fetchAllPosts",
  async (_, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.getAllPosts(token);
  }
);

export const adminUpdatePost = createAsyncThunk(
  "admin/updatePost",
  async ({ id, data }, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.updatePost(id, data, token);
  }
);

export const adminDeletePost = createAsyncThunk(
  "admin/deletePost",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.deletePost(id, token);
  }
);

// --- Authors ---
export const fetchAllAuthors = createAsyncThunk(
  "admin/fetchAllAuthors",
  async (_, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.getAllAuthors(token);
  }
);

export const adminUpdateAuthor = createAsyncThunk(
  "admin/updateAuthor",
  async ({ id, data }, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.updateAuthor(id, data, token);
  }
);

export const adminDeleteAuthor = createAsyncThunk(
  "admin/deleteAuthor",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.deleteAuthor(id, token);
  }
);

// --- Categories ---
export const fetchAllCategories = createAsyncThunk(
  "admin/fetchAllCategories",
  async (_, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.getAllCategories(token);
  }
);

export const adminUpdateCategory = createAsyncThunk(
  "admin/updateCategory",
  async ({ id, data }, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.updateCategory(id, data, token);
  }
);

export const adminDeleteCategory = createAsyncThunk(
  "admin/deleteCategory",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await adminService.deleteCategory(id, token);
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    posts: [],
    authors: [],
    categories: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Posts
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(adminUpdatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(adminDeletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.meta.arg);
      })
      // Authors
      .addCase(fetchAllAuthors.fulfilled, (state, action) => {
        state.authors = action.payload;
      })
      .addCase(adminUpdateAuthor.fulfilled, (state, action) => {
        state.authors = state.authors.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      })
      .addCase(adminDeleteAuthor.fulfilled, (state, action) => {
        state.authors = state.authors.filter((a) => a._id !== action.meta.arg);
      })
      // Categories
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(adminUpdateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(adminDeleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c._id !== action.meta.arg);
      });
  },
});

export default adminSlice.reducer;