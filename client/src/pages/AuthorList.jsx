import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors, deleteAuthor } from "../features/author/authorSlice";
import { Link } from "react-router-dom";

const AuthorsList = () => {
  const dispatch = useDispatch();
  const { authors, isLoading } = useSelector((state) => state.authors);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this author?")) {
      dispatch(deleteAuthor(id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">All Authors</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {authors.map((author) => (
            <li key={author._id} className="flex items-center justify-between border-b pb-2">
              <div>
                <span className="font-semibold">{author.name}</span>
                {author.bio && <span className="ml-2 text-gray-500">({author.bio})</span>}
              </div>
              <div className="flex gap-2">
                <Link to={`/author/${author._id}`} className="text-blue-600 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(author._id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorsList;