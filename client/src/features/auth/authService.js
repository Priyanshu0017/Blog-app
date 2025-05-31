import axios from "axios";
import { ApiUrl } from "../../../config";

const register = async (formData) => {
  const response = await axios.post(`${ApiUrl}/api/user/register` ,formData);
  const data = response.data;
  localStorage.setItem("user", JSON.stringify(data));
  return data;
  
};

const login = async (formData) => {
  const response = await axios.post(`${ApiUrl}/api/user/login` , formData);
  const data = response.data;
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};


//  this  is for google oAuth
const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${ApiUrl}/auth/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = { ...res.data, token };
  localStorage.setItem("user", JSON.stringify(data));
  return data;

};

export const authservice = { register, login ,getCurrentUser };
