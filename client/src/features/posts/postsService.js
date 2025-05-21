import axios from "axios";
import { ApiUrl } from "../../../config";

const getPosts = async (token) => {
  const res = await axios.get(`${ApiUrl}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getPost = async (id, token) => {
  const res = await axios.get(`${ApiUrl}/api/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const createPost = async (data, token) => {
  const res = await axios.post(`${ApiUrl}/api/posts`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updatePost = async (id, data, token) => {
  const res = await axios.put(`${ApiUrl}/api/posts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deletePost = async (id, token) => {
  const res = await axios.delete(`${ApiUrl}/api/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const postsService = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

export default postsService;