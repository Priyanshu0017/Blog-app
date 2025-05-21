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

export const authservice = { register, login };
