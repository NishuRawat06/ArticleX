import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllArticle() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetcharticles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/api/articles/get-all`
        );
        setArticles(res.data);
        console.log(res, res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetcharticles();
    console.log(articles);
  }, []);

  return (
    <div>
      <h2 className="font-bold text-2xl sm:text-3xl text-[#875D4A] mx-5 my-5">
        All Articles
      </h2>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-4 
          my-10 
          mx-5
        "
      >
        {articles.map((article) => (
          <div
            key={article._id}
            onClick={() => navigate(`/Details/${article._id}`)}
            className="
    group
    cursor-pointer
    bg-white
    rounded-2xl
    border border-[#875D4A]/30
    p-5
    shadow-sm
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    duration-300
  "
          >

            {/* Title */}
            <h3
              className="
      text-lg sm:text-xl
      font-bold
      text-[#875D4A]
      line-clamp-2
      group-hover:underline
    "
            >
              {article.title}
            </h3>

            {/* Author */}
            <div className="mt-4 inline-block bg-[#F5F0E6] px-3 py-1 rounded-full text-sm text-[#875D4A]">
              ✍ {article.Author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
