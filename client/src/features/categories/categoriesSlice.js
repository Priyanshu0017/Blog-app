import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesService from "./categoriesService";

// Get token helper
const getToken = (thunkAPI) => thunkAPI.getState().auth.user.token;

// Thunks
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await categoriesService.getCategories(token);
  }
);

export const fetchCategory = createAsyncThunk(
  "categories/fetchOne",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await categoriesService.getCategory(id, token);
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (data, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await categoriesService.createCategory(data, token);
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await categoriesService.updateCategory(id, data, token);
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    return await categoriesService.deleteCategory(id, token);
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    category: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetCategoryState: (state) => {
      state.category = null;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.meta.arg
        );
      });
  },
});

export const { resetCategoryState } = categoriesSlice.actions;
export default categoriesSlice.reducer;