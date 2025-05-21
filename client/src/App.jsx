import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PrivateComponent from "./components/PrivateComponent";
import CategoryForm from "./pages/CategoryForm";
import AuthorForm from "./pages/AuthorForm";
import PostForm from "./pages/BlogPostForm";
import AuthorsList from "./pages/AuthorList";
import CategoriesList from "./pages/CategoriesList";
import ManageBlogs from "./pages/ManageBlogsPage";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";

// Admin route protection
const AdminRoute = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" />;
  if (!user.isAdmin) return <Navigate to="/" />;
  return <Outlet />;
};

// Redirect admin to dashboard after login
const RedirectOnLogin = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.isAdmin) navigate("/admin");
      else navigate("/");
    }
  }, [user, navigate]);
  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Admin Dashboard Route */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>
        {/* Protected Routes */}
        <Route path="/" element={<PrivateComponent />}>
          <Route path="" element={<Home />} />
          <Route path="post" element={<PostForm />} />
          <Route path="post/:id" element={<PostForm />} />
          <Route path="author" element={<AuthorForm />} />
          <Route path="author/:id" element={<AuthorForm />} />
          <Route path="category" element={<CategoryForm />} />
          <Route path="category/:id" element={<CategoryForm />} />
          <Route path="authors" element={<AuthorsList />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="manage-blogs" element={<ManageBlogs />} />
        </Route>
        {/* Auth Routes */}
        <Route path="/login" element={
          <RedirectOnLogin>
            <Login />
          </RedirectOnLogin>
        } />
        <Route path="/register" element={
          <RedirectOnLogin>
            <Register />
          </RedirectOnLogin>
        } />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;