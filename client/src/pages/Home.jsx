import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">Loading...</div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-center mt-8">Error: {message}</div>
    );

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Menu Button */}
      <button
        className={`fixed top-16 left-6 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg focus:outline-none${
          sidebarOpen ? " hidden" : ""
        }`}
        onClick={() => setSidebarOpen(true)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${
          sidebarOpen ? "left-0" : "-left-64"
        } h-full w-64 bg-white shadow-lg z-40 transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-bold text-lg text-blue-700">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-blue-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-6">
          <Link
            to="/post"
            className="py-2 px-4 rounded hover:bg-blue-50 text-blue-700 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            Create Blog
          </Link>
          <Link
            to="/author"
            className="py-2 px-4 rounded hover:bg-blue-50 text-blue-700 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            Create Author
          </Link>
          <Link
            to="/category"
            className="py-2 px-4 rounded hover:bg-blue-50 text-blue-700 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            Create Category
          </Link>
          <Link
            to="/authors"
            className="py-2 px-4 rounded hover:bg-blue-50 text-blue-700 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            View Authors
          </Link>
          <Link
            to="/categories"
            className="py-2 px-4 rounded hover:bg-blue-50 text-blue-700 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            View Categories
          </Link>

          <Link
            to="/manage-blogs"
            className="py-2 px-4 rounded hover:bg-blue-50 text-blue-700 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            Manage Blogs
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setSidebarOpen(false)}
          style={{ left: 0 }}
        ></div>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          All Blog Posts
        </h2>
        {posts.length === 0 && (
          <div className="text-center text-gray-500">No posts found.</div>
        )}
        <ul className="space-y-6">
          {posts
            .filter((post) => post.publishStatus === "published")
            .map((post) => (
              <li
                key={post._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-semibold first-letter:uppercase text-blue-600 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                  <span>
                    <b>Author:</b> {post.author?.name || "Unknown"}
                  </span>
                  <span>
                    <b>Category:</b> {post.category?.name || "Unknown"}
                  </span>
                  <span>
                    <b>Status:</b>{" "}
                    <span
                      className={`px-2 py-1 rounded-full ${
                        post.publishStatus === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.publishStatus}
                    </span>
                  </span>
                  <span>
                    <b>Created:</b>{" "}
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
