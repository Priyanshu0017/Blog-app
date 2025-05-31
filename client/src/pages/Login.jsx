import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(form));
    // Navigation is handled by App.jsx redirect logic
  };

  //  this  is for google oAuth
  const handleLogin = () => {
    window.location.href = "https://blog-app-frze.onrender.com/auth/google";
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {isError && <div className="text-red-500 mb-4">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white px-6 py-2 my-4 rounded hover:bg-blue-700"
      >
        Login with Google
      </button>
      <div className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 underline">
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;
