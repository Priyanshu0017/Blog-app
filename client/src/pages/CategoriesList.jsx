import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../features/categories/categoriesSlice";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">All Categories</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat._id} className="flex items-center justify-between border-b pb-2">
              <div>
                <span className="font-semibold">{cat.name}</span>
                {cat.description && <span className="ml-2 text-gray-500">({cat.description})</span>}
              </div>
              <div className="flex gap-2">
                <Link to={`/category/${cat._id}`} className="text-blue-600 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesList;