import axios from "axios";

const register = async (formData) => {
  const response = await axios.post(`/api/user/register` ,formData);
  const data = response.data;
  localStorage.setItem("user", JSON.stringify(data));
  return data;
  
};

const login = async (formData) => {
  const response = await axios.post(`/api/user/login` , formData);
  const data = response.data;
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const authservice = { register, login };
