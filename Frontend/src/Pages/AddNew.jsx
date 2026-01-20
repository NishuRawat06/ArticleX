import React, { useState } from "react";
import axios from "axios";

export default function AddNew() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [Author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API}/api/articles`, {
        Author,
        title,
        body,
      });
      alert("Article added successfully!");
      setAuthor("");
      setTitle("");
      setBody("");
    } catch (error) {
      console.log(error);
      alert("Failed to add article.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 relative">

        <h1 className="text-2xl sm:text-3xl font-bold text-[#875D4A] mb-4 text-center">
          Create Article
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* Author */}
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-[#875D4A] mb-1">
               Author
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-[#875D4A]/30 rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#875D4A] transition"
              value={Author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-[#875D4A] mb-1">
               Title
            </label>
            <input
              type="text"
              placeholder="Article title"
              className="border border-[#875D4A]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#875D4A] transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Body */}
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-[#875D4A] mb-1">
               Body
            </label>
            <textarea
              placeholder="Write your article..."
              className="border border-[#875D4A]/30 rounded-lg px-3 py-2 min-h-25 sm:min-h-30 focus:outline-none focus:ring-1 focus:ring-[#875D4A] transition resize-none"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#875D4A] text-white font-bold py-2 rounded-lg text-sm sm:text-base hover:bg-[#a0755e] transition"
          >
            Add Article
          </button>

        </form>
      </div>
    </div>
  );
}
