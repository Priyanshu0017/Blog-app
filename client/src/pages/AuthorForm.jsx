import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAuthor,
  createAuthor,
  updateAuthor,
  resetAuthorState,
} from "../features/author/authorSlice";

const AuthorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { author, isLoading } = useSelector((state) => state.authors);

  const [form, setForm] = useState({ name: "", avatar: "", bio: "" });

  useEffect(() => {
    if (id) {
      dispatch(fetchAuthor(id));
    } else {
      dispatch(resetAuthorState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && author) {
      setForm({
        name: author.name || "",
        avatar: author.avatar || "",
        bio: author.bio || "",
      });
    }
  }, [author, id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(updateAuthor({ id, data: form }));
    } else {
      await dispatch(createAuthor(form));
    }
    navigate("/authors");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{id ? "Edit" : "Create"} Author</h2>
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
          name="avatar"
          className="w-full border p-2 rounded"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          className="w-full border p-2 rounded"
          placeholder="Short Bio"
          value={form.bio}
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

export default AuthorForm;