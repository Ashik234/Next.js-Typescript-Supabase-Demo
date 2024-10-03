"use client";
import React from "react";
import { supabase } from "../../lib/supabase";
const AddBlogPage: React.FC<any> = ({ isOpen, onClose, addBlogPost }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleAddBlog = async () => {
    const { data, error } = await supabase
      .from("blog")
      .insert([{ title, description }])
      .select();

    if (error) {
      console.error("Error adding blog post:", error.message);
      return;
    }
    if (data) {
      addBlogPost(data[0]);
    }
    onClose();
    setTitle("");
    setDescription("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-md w-11/12 max-w-md text-black">
        <h2 className="text-xl font-semibold mb-4">New Blog Post</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter blog title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={4}
            placeholder="Enter blog content"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddBlog}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mr-2"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage;
