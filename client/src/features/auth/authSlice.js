import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authservice } from "./authService";

//  this  is for google oAuth
export const fetchUser = createAsyncThunk("Auth/fetchUser", async () => {
  return await authservice.getCurrentUser();
});

const userExist = JSON.parse(localStorage.getItem("user"));

const authslice = createSlice({
  name: "auth",
  initialState: {
    user: userExist || null, // Stores the authenticated user's data
    isLoading: false, // Indicates if an authentication request is in progress
    isError: false, // Indicates if there was an error during authentication
    isSuccess: false, // Indicates if the authentication was successful
    message: "", // Stores any error or success messages
  },
  reducers: {

    //  this  is for google oAuth
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = null;
    });
    //  this  is for google oAuth
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      });
  },
});

export const { setUser, clearUser } = authslice.actions;
export default authslice.reducer;

// Register user

export const register = createAsyncThunk(
  "Auth/Register",
  async (formData, thunkAPI) => {
    try {
      return await authservice.register(formData);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Login user

export const login = createAsyncThunk(
  "Auth/Login",
  async (formData, thunkAPI) => {
    try {
      return await authservice.login(formData);
    } catch (error) {
      const message = await error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User

export const logoutUser = createAsyncThunk("Auth/Logout", async () => {
  localStorage.removeItem("user");
});
