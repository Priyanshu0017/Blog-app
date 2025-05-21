import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCategory,
  createCategory,
  updateCategory,
  resetCategoryState,
} from "../features/categories/categoriesSlice";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category, isLoading } = useSelector((state) => state.categories);

  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    if (id) {
      dispatch(fetchCategory(id));
    } else {
      dispatch(resetCategoryState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
      });
    }
  }, [category, id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(updateCategory({ id, data: form }));
    } else {
      await dispatch(createCategory(form));
    }
    navigate("/categories");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{id ? "Edit" : "Create"} Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;