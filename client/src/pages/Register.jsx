import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Password mismatch");
      return;
    }
    await dispatch(
      register({ name: form.name, email: form.email, password: form.password })
    );
    // Navigation is handled by App.jsx redirect logic
  };


  //  this  is for google oAuth
 const handleregister = () => {
  window.location.href = "https://blog-app-frze.onrender.com/auth/google";
}

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {isError && <div className="text-red-500 mb-4">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <input
          name="confirmPassword"
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <button
        onClick={handleregister}
        className="w-full bg-green-600 text-white px-6 py-2 my-4 rounded hover:bg-blue-700"
      >
        Continue with Google
      </button>
      <div className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 underline">
          Login
        </a>
      </div>
    </div>
  );
};

export default Register;
