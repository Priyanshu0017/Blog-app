import axios from "axios";
import { ApiUrl } from "../../../config";

const getAuthors = async (token) => {
  const res = await axios.get(`${ApiUrl}/api/author`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getAuthor = async (id, token) => {
  const res = await axios.get(`${ApiUrl}/api/author/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const createAuthor = async (data, token) => {
  const res = await axios.post(`${ApiUrl}/api/author`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateAuthor = async (id, data, token) => {
  const res = await axios.put(`${ApiUrl}/api/author/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteAuthor = async (id, token) => {
  const res = await axios.delete(`${ApiUrl}/api/author/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const authorService = {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};

export default authorService;