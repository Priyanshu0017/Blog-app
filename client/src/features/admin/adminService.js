import axios from "axios";

// --- Blog Posts ---
const getAllPosts = async (token) => {
  const res = await axios.get("/api/admin/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updatePost = async (id, data, token) => {
  const res = await axios.put(`/api/admin/posts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deletePost = async (id, token) => {
  const res = await axios.delete(`/api/admin/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// --- Authors ---
const getAllAuthors = async (token) => {
  const res = await axios.get("/api/admin/authors", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateAuthor = async (id, data, token) => {
  const res = await axios.put(`/api/admin/authors/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteAuthor = async (id, token) => {
  const res = await axios.delete(`/api/admin/authors/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// --- Categories ---
const getAllCategories = async (token) => {
  const res = await axios.get("/api/admin/categories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateCategory = async (id, data, token) => {
  const res = await axios.put(`/api/admin/categories/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteCategory = async (id, token) => {
  const res = await axios.delete(`/api/admin/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const adminService = {
  getAllPosts,
  updatePost,
  deletePost,
  getAllAuthors,
  updateAuthor,
  deleteAuthor,
  getAllCategories,
  updateCategory,
  deleteCategory,
};

export default adminService;