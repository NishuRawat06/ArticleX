import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!article) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/articles/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Delete failed: route not found");
        }
        return res.json();
      })
      .then(data => {
        alert(data.message);
        navigate("/"); 
      })
      .catch(err => console.error(err.message));
  };

  return (
    <div className="bg-[#F5F0E6] flex justify-center items-start px-4 py-6">
      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center gap-4">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#875D4A] text-center">
          {article.title}
        </h1>

        {/* Author */}
        <h2 className="text-sm sm:text-base text-[#343231] font-semibold">
          ✍ Written by {article.Author}
        </h2>

        {/* Body */}
        <p className="text-sm sm:text-base text-[#161615] text-center px-4 leading-relaxed">
          {article.body}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-3 flex-wrap justify-center">
          <button
            onClick={handleDelete}
            className="bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold py-1.5 px-5 rounded-lg shadow-md text-sm transition"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/edit/${article._id}`)}
            className="bg-[#875D4A] hover:bg-[#a0755e] text-white font-bold py-1.5 px-5 rounded-lg shadow-md text-sm transition"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
}
