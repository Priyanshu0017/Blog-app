import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost, updatePost } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";

const ManageBlogs = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this blog post?")) {
      dispatch(deletePost(id));
    }
  };

  const handleToggleStatus = (post) => {
    dispatch(
      updatePost({
        id: post._id,
        data: {
          ...post,
          publishStatus: post.publishStatus === "published" ? "unpublished" : "published",
        },
      })
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Manage Blog Posts
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post._id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-1">{post.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    post.publishStatus === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {post.publishStatus}
                </span>
              </div>
              <div className="flex gap-3 mt-3 md:mt-0">
                <button
                  onClick={() => handleToggleStatus(post)}
                  className="px-3 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs"
                >
                  {post.publishStatus === "published" ? "Unpublish" : "Publish"}
                </button>
                <Link
                  to={`/post/${post._id}`}
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageBlogs;