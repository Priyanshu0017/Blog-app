import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorService from "./authorService";

const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAll",
  async (_, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await authorService.getAuthors(token);
  }
);

export const fetchAuthor = createAsyncThunk(
  "authors/fetchOne",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await authorService.getAuthor(id, token);
  }
);

export const createAuthor = createAsyncThunk(
  "authors/create",
  async (data, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await authorService.createAuthor(data, token);
  }
);

export const updateAuthor = createAsyncThunk(
  "authors/update",
  async ({ id, data }, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await authorService.updateAuthor(id, data, token);
  }
);

export const deleteAuthor = createAsyncThunk(
  "authors/delete",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await authorService.deleteAuthor(id, token);
  }
);

const authorSlice = createSlice({
  name: "authors",
  initialState: {
    authors: [],
    author: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetAuthorState: (state) => {
      state.author = null;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.author = action.payload;
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.authors.push(action.payload);
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        state.authors = state.authors.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        state.authors = state.authors.filter(
          (a) => a._id !== action.meta.arg
        );
      });
  },
});

export const { resetAuthorState } = authorSlice.actions;
export default authorSlice.reducer;