import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export default function AllArticle() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetcharticles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/articles/get-all"
        );
        setArticles(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetcharticles();
  }, []);
  return (
    <div>
      <h2 className="font-bold text-3xl text-[#875D4A] mx-5 my-5">All Articles</h2>
      <div className="grid grid-cols-5 gap-4 my-10 mx-5 cursor-pointer">
        {articles.map((article) => (
          <div key={article._id} onClick={() => navigate(`/Details/${article._id}`)} className="border-2 border-[#875D4A] p-4 rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-[#875D4A]">{article.title} </h3>
            <p className="mt-2 text-gray-700">by {article.Author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
