import React, { useState } from "react";
import BlogsList from "./ManageBlogsPage";
import AuthorsList from "./AuthorList";
import CategoriesList from "./CategoriesList";
import img1 from '../../public/download-removebg-preview.png'


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("blogs");

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-4">
        <img src={img1} alt="Admin Logo" className="w-24 rounded-full h-24 mb-2" />
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-700">
          Admin Dashboard
        </h2>
      </div>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${activeTab === "blogs" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
          onClick={() => setActiveTab("blogs")}
        >
          All Blogs
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "authors" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
          onClick={() => setActiveTab("authors")}
        >
          All Authors
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "categories" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
          onClick={() => setActiveTab("categories")}
        >
          All Categories
        </button>
      </div>

      <div>
        {activeTab === "blogs" && <BlogsList isAdmin={true} />}
        {activeTab === "authors" && <AuthorsList isAdmin={true} />}
        {activeTab === "categories" && <CategoriesList isAdmin={true} />}
      </div>
    </div>
  );
};

export default AdminDashboard;