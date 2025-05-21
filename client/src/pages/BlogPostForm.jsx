import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPost,
  createPost,
  updatePost,
  resetPostState,
} from "../features/posts/postsSlice";
import { fetchAuthors } from "../features/author/authorSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post, isLoading } = useSelector((state) => state.posts);
  const { authors } = useSelector((state) => state.authors);
  const { categories } = useSelector((state) => state.categories);

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    publishStatus: "unpublished",
  });

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchCategories());

    if (id) {
      dispatch(fetchPost(id));
    } else {
      dispatch(resetPostState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && post) {
      setForm({
        title: post.title || "",
        content: post.content || "",
        author: post.author?._id || "",
        category: post.category?._id || "",
        publishStatus: post.publishStatus || "unpublished",
      });
    }
  }, [post, id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(updatePost({ id, data: form }));
    } else {
      await dispatch(createPost(form));
    }
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{id ? "Edit" : "Create"} Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          className="w-full border p-2 rounded"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />
        <select
          name="author"
          className="w-full border p-2 rounded"
          value={form.author}
          onChange={handleChange}
          required
        >
          <option value="">Select Author</option>
          {authors && authors.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>
        <select
          name="category"
          className="w-full border p-2 rounded"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories && categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="publishStatus"
          className="w-full border p-2 rounded"
          value={form.publishStatus}
          onChange={handleChange}
        >
          <option value="unpublished">Unpublished</option>
          <option value="published">Published</option>
        </select>
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

export default PostForm;