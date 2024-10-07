"use client";
import React, { useEffect } from "react";
import AddBlogPage from "./addBlog/page";
import { Post } from "../types/post";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

function Page() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [blogPosts, setBlogPosts] = React.useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleBlog = async () => {
      const { data, error } = await supabase.from("blog").select("*");
      if (error) {
        console.error("Error fetching blog posts:", error.message);
      } else if (data) {
        setBlogPosts(data as Post[]);
      }
    };
    handleBlog();
  }, []);

  const handleAddBlog = () => {
    setIsModalOpen(true);
  };

  const addBlogPost = (newPost: Post) => {
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    router.push("login");
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center w-full max-w-4xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Blog</h1>
        <button
          onClick={handleAddBlog}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Blog
        </button>
        <button
          onClick={signOut}
          className="px-4 py-2 text-black  border-red-700 border rounded"
        >
          LogOut
        </button>
      </header>

      <section className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Latest Posts
        </h2>
        <hr />

        {blogPosts.map((post, index) => (
          <div key={index} className="mb-4 mt-4 border-b pb-4">
            <h3 className="text-5xl font-medium text-gray-700">{post.title}</h3>
            {post.image && (
              <img
                src={post.image}
                alt="Blog Image"
                className="w-full h-auto mt-4"
              />
            )}
            <div className="flex justify-between mt-8">
              <p className="text-gray-900 text-xl">{post.description}</p>
              <p className="text-sm text-black font-semibold">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </section>

      <AddBlogPage
        addBlogPost={addBlogPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Page;
