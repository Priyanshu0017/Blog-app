import axios from "axios";
import { ApiUrl } from "../../../config";

const getCategories = async (token) => {
  const res = await axios.get(`${ApiUrl}/api/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getCategory = async (id, token) => {
  const res = await axios.get(`${ApiUrl}/api/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const createCategory = async (data, token) => {
  const res = await axios.post(`${ApiUrl}/api/categories`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateCategory = async (id, data, token) => {
  const res = await axios.put(`${ApiUrl}/api/categories/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteCategory = async (id, token) => {
  const res = await axios.delete(`${ApiUrl}/api/categories/${id}`, {
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