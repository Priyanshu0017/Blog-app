import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import postsReducer from './posts/postsSlice'
import categoriesReducer from "./categories/categoriesSlice";
import authorReducer from "./author/authorSlice";
import adminReducer from "./admin/adminSlice";

const store = configureStore({
  reducer: { auth , posts: postsReducer,categories: categoriesReducer,admin: adminReducer,authors: authorReducer},
});

export default store;
