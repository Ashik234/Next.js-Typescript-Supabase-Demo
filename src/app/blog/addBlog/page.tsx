"use client";
import React from "react";
import { supabase } from "../../lib/supabase";
const AddBlogPage: React.FC<any> = ({ isOpen, onClose, addBlogPost }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const handleAddBlog = async () => {
    const { data, error } = await supabase
      .from("blog")
      .insert([{ title, description, image: imageUrl }])
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
    setImageUrl("");
  };

  async function uploadImage(e: any) {
    let file = e.target.files[0];
    const uniqueFileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("Files")
      .upload(uniqueFileName, file);

    if (error) {
      console.log("Error uploading image:", error.message);
      return;
    }

    // Retrieve the public URL
    const { data: publicData } = supabase.storage
      .from("Files")
      .getPublicUrl(uniqueFileName);
    setImageUrl(publicData?.publicUrl || ""); // Store the public URL for the image
  }

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
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={4}
            placeholder="Enter blog description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => uploadImage(e)}
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
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
