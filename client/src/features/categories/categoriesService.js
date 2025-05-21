import axios from "axios";

const getCategories = async (token) => {
  const res = await axios.get("/api/categories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getCategory = async (id, token) => {
  const res = await axios.get(`/api/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const createCategory = async (data, token) => {
  const res = await axios.post("/api/categories", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateCategory = async (id, data, token) => {
  const res = await axios.put(`/api/categories/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteCategory = async (id, token) => {
  const res = await axios.delete(`/api/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const categoriesService = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoriesService;